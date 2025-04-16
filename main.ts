import { Plugin, Notice, TFile, TFolder } from "obsidian";
import { CourseConfigModal } from "./src/CourseConfigModal";
import { CursoConfig } from "./src/CourseConfigModal";
import { generarMarkdownCurso } from "./src/guardarConfiguracionCursoMarkdown";
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
      id: "configurar-curso",
      name: "⚙️ Configurar curso (fechas y módulos)",
      callback: () => {
        const promptModal = new PromptModal(
          this.app,
          "Introduce el código del curso (Ej: 2025/001234)",
          async (codigoCurso) => {
            const configExistente = this.cursoConfigs[codigoCurso];

            new CourseConfigModal(
              this.app,
              async (datosCurso) => {
                // Guardar configuración
                this.cursoConfigs[datosCurso.codigoCurso] = datosCurso;
                await this.saveData({ cursoConfigs: this.cursoConfigs });

                // Guardar markdown
                const markdown = generarMarkdownCurso(datosCurso);
                const [anio, codInterno] = datosCurso.codigoCurso.split(
                  "/"
                ) ?? ["Desconocido", datosCurso.codigoCurso];
                const folderPath = `Cursos/${anio}/${codInterno}`;
                const filePath = `${folderPath}/configuracion.md`;

                await this.ensureFolderExists(folderPath);

                const existing = this.app.vault.getAbstractFileByPath(filePath);
                if (existing instanceof TFile) {
                  await this.app.vault.modify(existing, markdown);
                } else {
                  await this.app.vault.create(filePath, markdown);
                }

                new Notice(
                  `✅ Curso ${datosCurso.codigoCurso} configurado y guardado en ${filePath}`
                );
              },
              configExistente
            ).open();
          }
        );

        promptModal.open();
      },
    });
    this.addCommand({
      id: "generar-asistencia-desde-csv",
      name: "📂 Generar informe de asistencia desde CSV",
      callback: async () => {
        const promptModal = new PromptModal(
          this.app,
          "Introduce el código del curso (Ej: 2025/001234)",
          async (codigoCurso) => {
            const config = this.cursoConfigs[codigoCurso];
            if (!config) {
              new Notice("❌ No se encontró configuración para ese código.");
              return;
            }

            // 1. Obtener el archivo CSV (activo o más reciente del directorio)
            let csvFile = this.app.workspace.getActiveFile();
            if (!csvFile || !csvFile.name.endsWith(".csv")) {
              const abstract = this.app.vault.getAbstractFileByPath(
                config.rutaCurso
              );

              if (!(abstract instanceof TFolder)) {
                new Notice("❌ No se pudo acceder al directorio del curso.");
                return;
              }

              const archivosCSV = abstract.children.filter(
                (f) => f instanceof TFile && f.name.endsWith(".csv")
              ) as TFile[];

              if (archivosCSV.length === 0) {
                new Notice(
                  "❌ No se encontró ningún archivo CSV en la carpeta del curso."
                );
                return;
              }

              archivosCSV.sort((a, b) => b.stat.mtime - a.stat.mtime);
              csvFile = archivosCSV[0];
              new Notice(`📄 Se usará el CSV más reciente: ${csvFile.name}`);
            }

            // 2. Leer contenido del CSV
            const csvText = await this.app.vault.read(csvFile);

            // 3. Parsear registros
            const { parseCSVContent } = await import("./src/csvParser");
            const registros = parseCSVContent(csvText);

            // 4. Cargar módulos desde configuracion.md
            const { cargarConfiguracionCursoMarkdown } = await import(
              "./src/cargarConfiguracionCursoMarkdown"
            );
            const modulos = await cargarConfiguracionCursoMarkdown(
              this.app.vault,
              `${config.rutaCurso}/configuracion.md`
            );

            if (!modulos) {
              new Notice("❌ No se pudo cargar configuracion.md");
              return;
            }

            // 5. Calcular asistencia (ya no pasamos horasTotalesPorModulo)
            const { calcularAsistenciaPorModulo } = await import(
              "./src/calcularAsistenciaPorModulo"
            );
            const resultados = calcularAsistenciaPorModulo(registros, modulos);

            // 6. Guardar informe
            const { guardarInformeAsistencia } = await import(
              "./src/generarInformeAsistencia"
            );
            await guardarInformeAsistencia(
              this.app.vault,
              config.rutaCurso,
              resultados
            );

            new Notice("✅ Informe de asistencia generado correctamente.");
          }
        );
        promptModal.open();
      },
    });
  }
}
