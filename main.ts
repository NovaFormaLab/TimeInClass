import { Plugin, Notice, TFile } from "obsidian";
import { parseCSVContent } from "./src/csvParser";
import { CourseConfigModal } from "./src/CourseConfigModal";
import { CursoConfig } from "./src/CourseConfigModal";
import { generarMarkdownCurso } from "./src/guardarConfiguracionCursoMarkdown";
import { generarMarkdownAsistenciaPorModulo } from "./src/generarMarkdownAsistenciaPorModulo";
import { calcularAsistenciaPorModulo } from "./src/calcularAsistenciaPorModulo";
import { PromptModal } from "./src/PromptModal";

/**
 * TimeInClass - Obsidian Plugin
 *
 * Copyright (C) 2025 ikikidev & NovaFormaLab
 *
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * See LICENSE file for details.
 */

export default class TimeInClass extends Plugin {
  cursoConfigs: Record<string, CursoConfig> = {};

  async ensureFolderExists(path: string) {
    const parts = path.split("/");
    let currentPath = "";
    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      if (!this.app.vault.getAbstractFileByPath(currentPath)) {
        await this.app.vault.createFolder(currentPath);
      }
    }
  }

  async onload() {
    const data = await this.loadData();
    this.cursoConfigs = data?.cursoConfigs || {};

    this.addCommand({
      id: "generar-asistencia-desde-csv",
      name: "📂 Generar notas desde CSV (SIFO)",
      callback: async () => {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) {
          new Notice("Abre una nota dentro de la carpeta donde esté el CSV.");
          return;
        }

        const activeFolderPath = activeFile.path
          .split("/")
          .slice(0, -1)
          .join("/");
        const folderFiles = this.app.vault
          .getFiles()
          .filter(
            (f) => f.path.startsWith(activeFolderPath) && f.extension === "csv"
          );

        if (folderFiles.length === 0) {
          new Notice("No se encontró ningún archivo CSV en esta carpeta.");
          return;
        }

        // Seleccionar el archivo CSV más reciente
        const csvFile = folderFiles.reduce((a, b) =>
          a.stat.mtime > b.stat.mtime ? a : b
        );

        const content = await this.app.vault.read(csvFile);
        const cursos = parseCSVContent(content);

        for (const curso of cursos) {
          const config = this.cursoConfigs[curso.codigo];
          if (!config) {
            new Notice(
              `⚠️ Curso ${curso.codigo} no tiene configuración. Usa "Configurar curso".`
            );
            continue;
          }

          const [año, codInterno] = curso.codigo.split("/") ?? [
            "SinFecha",
            curso.codigo,
          ];
          const folderPath = `Cursos/${año}/${codInterno}`;
          await this.ensureFolderExists(folderPath);

          const alumnosUnicos = Array.from(
            new Set(curso.alumnos.map((a) => a.nif))
          );

          for (const nif of alumnosUnicos) {
            const alumno = curso.alumnos.find((a) => a.nif === nif);
            const nombre = alumno?.nombre ?? "Desconocido";

            const filas = curso.alumnos
              .filter((a) => a.nif === nif)
              .map((a) => ({
                nif: a.nif,
                alumno: a.nombre,
                mes: a.mes,
                horas: parseFloat(String(a.horasAsistidas ?? "0").replace(",", ".").replace(";", "."))
              }));

            const resultados = calcularAsistenciaPorModulo(config, filas, 5);
            const markdown = generarMarkdownAsistenciaPorModulo(
              { nombre, nif },
              resultados
            );

            const filePath = `${folderPath}/asistencia_${nif}.md`;
            const existing = this.app.vault.getAbstractFileByPath(filePath);
            if (existing instanceof TFile) {
              await this.app.vault.modify(existing, markdown);
            } else {
              await this.app.vault.create(filePath, markdown);
            }
          }
        }

        new Notice(
          `✅ CSV procesado: ${csvFile.name}\n📘 Cursos generados: ${cursos.length}`
        );
      },
    });

    this.addCommand({
      id: "configurar-curso",
      name: "⚙️ Configurar curso (fechas y módulos)",
      callback: () => {
        const promptModal = new PromptModal(this.app, "Introduce el código del curso (Ej: 2025/001234)", async (codigoCurso) => {
          const configExistente = this.cursoConfigs[codigoCurso];
    
          new CourseConfigModal(this.app, async (datosCurso) => {
            // Guardar configuración
            this.cursoConfigs[datosCurso.codigoCurso] = datosCurso;
            await this.saveData({ cursoConfigs: this.cursoConfigs });
    
            // Guardar markdown
            const markdown = generarMarkdownCurso(datosCurso);
            const [anio, codInterno] = datosCurso.codigoCurso.split("/") ?? [
              "Desconocido",
              datosCurso.codigoCurso,
            ];
            const folderPath = `Cursos/${anio}/${codInterno}`;
            const filePath = `${folderPath}/configuracion.md`;
    
            await this.ensureFolderExists(folderPath);
    
            const existing = this.app.vault.getAbstractFileByPath(filePath);
            if (existing instanceof TFile) {
              await this.app.vault.modify(existing, markdown);
            } else {
              await this.app.vault.create(filePath, markdown);
            }
    
            new Notice(`✅ Curso ${datosCurso.codigoCurso} configurado y guardado en ${filePath}`);
          }, configExistente).open();
        });
    
        promptModal.open();
      }
    });
    
  }
}
