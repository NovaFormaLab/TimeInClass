import { Plugin, Notice, TFile } from "obsidian";
import { parseCSVContent } from "./src/csvParser";
import { generarNotaCursoMarkdown } from "./src/generarNotaCursoMarkdown";

/**
 * TimeInClass - Obsidian Plugin
 *
 * Copyright (C) 2025 ikikidev & NovaFormaLab
 *
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * See LICENSE file for details.
 */

export default class TimeInClass extends Plugin {
  async onload() {
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
          const markdown = generarNotaCursoMarkdown(curso);

          // Extraer año y código del campo "Cod. Curso" (ej: 2024/001456)
          const [año, codInterno] = curso.codigo.split("/") ?? [
            "SinFecha",
            curso.codigo,
          ];
          const folderPath = `Cursos/${año}`;
          const fileName = `Curso_${año}_${codInterno}.md`;
          const fullPath = `${folderPath}/${fileName}`;

          // Asegurar que la carpeta existe
          const folder = this.app.vault.getAbstractFileByPath(folderPath);
          if (!folder) {
            await this.app.vault.createFolder(folderPath);
          }

          // Crear o actualizar el archivo
          const existing = this.app.vault.getAbstractFileByPath(fullPath);
          if (existing instanceof TFile) {
            await this.app.vault.modify(existing, markdown);
          } else {
            await this.app.vault.create(fullPath, markdown);
          }
        }

        new Notice(
          `✅ CSV procesado: ${csvFile.name}\n📘 Cursos generados: ${cursos.length}`
        );
      },
    });
  }
}
