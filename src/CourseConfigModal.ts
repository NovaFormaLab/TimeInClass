import { Modal, Notice, App, Setting } from "obsidian";

export interface Modulo {
  codigo: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface CursoConfig {
  codigoCurso: string;
  codigo: string;
  denominacionCurso: string;
  fechaInicioCurso: string;
  fechaFinCurso: string;
  numeroModulos: number;
  modulos: Modulo[];
}

export class CourseConfigModal extends Modal {
  private onSubmit: (data: CursoConfig) => void;

  constructor(
    app: App,
    onSubmit: (data: CursoConfig) => void,
    private dataExistente?: CursoConfig
  ) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Configuración del Curso" });
    contentEl.createEl("h3", { text: "Datos generales del curso" });

    let codigoCurso = this.dataExistente?.codigoCurso || "";
    let codigo = this.dataExistente?.codigo || "";
    let denominacionCurso = this.dataExistente?.denominacionCurso || "";
    let fechaInicioCurso = this.dataExistente?.fechaInicioCurso || "";
    let fechaFinCurso = this.dataExistente?.fechaFinCurso || "";
    let numeroModulos = this.dataExistente?.numeroModulos || 0;

    new Setting(contentEl)
      .setName("Código del curso")
      .addText((text) =>
        text
          .setPlaceholder("Ej: 2024/001234")
          .onChange((value) => (codigoCurso = value))
      );

    new Setting(contentEl)
      .setName("Código")
      .addText((text) => text.onChange((value) => (codigo = value)));

    new Setting(contentEl)
      .setName("Denominación del curso")
      .addText((text) => text.onChange((value) => (denominacionCurso = value)));

    new Setting(contentEl)
      .setName("Fecha de inicio del curso")
      .addText((text) =>
        text
          .setPlaceholder("YYYY-MM-DD")
          .onChange((value) => (fechaInicioCurso = value))
      );

    new Setting(contentEl)
      .setName("Fecha de fin del curso")
      .addText((text) =>
        text
          .setPlaceholder("YYYY-MM-DD")
          .onChange((value) => (fechaFinCurso = value))
      );

    new Setting(contentEl).setName("Número de módulos").addText((text) => {
      text
        .setPlaceholder("Ej: 3")
        .setValue(numeroModulos.toString())
        .onChange((value) => {
          const num = parseInt(value);
          if (!isNaN(num) && num > 0) {
            numeroModulos = num;
            renderModulosFields();
          }
        });
    });

    const modulos: Modulo[] = this.dataExistente?.modulos?.slice() || [];

    const moduloFieldsContainer = contentEl.createDiv();

    const renderModulosFields = () => {
      moduloFieldsContainer.empty();

      while (modulos.length < numeroModulos) {
        modulos.push({
          codigo: "",
          nombre: "",
          fechaInicio: "",
          fechaFin: "",
        });
      }
      modulos.length = numeroModulos;

      for (let i = 0; i < numeroModulos; i++) {
        const modulo = modulos[i];

        moduloFieldsContainer.createEl("h3", { text: `Módulo ${i + 1}` });
        moduloFieldsContainer.createEl("hr");

        new Setting(moduloFieldsContainer)
          .setName("Código del módulo")
          .addText((text) =>
            text
              .setValue(modulo.codigo)
              .onChange((value) => (modulo.codigo = value))
          );

        new Setting(moduloFieldsContainer)
          .setName("Nombre del módulo")
          .addText((text) =>
            text
              .setValue(modulo.nombre)
              .onChange((value) => (modulo.nombre = value))
          );

        new Setting(moduloFieldsContainer)
          .setName("Fecha de inicio")
          .addText((text) =>
            text
              .setPlaceholder("YYYY-MM-DD")
              .setValue(modulo.fechaInicio)
              .onChange((value) => (modulo.fechaInicio = value))
          );

        new Setting(moduloFieldsContainer)
          .setName("Fecha de fin")
          .addText((text) =>
            text
              .setPlaceholder("YYYY-MM-DD")
              .setValue(modulo.fechaFin)
              .onChange((value) => (modulo.fechaFin = value))
          );
      }
    };

    contentEl.createEl("h3", { text: "Módulos del curso" });

    if (numeroModulos > 0) {
      contentEl.createEl("h3", { text: "Módulos del curso" });
      renderModulosFields();
    }

    new Setting(contentEl).addButton((btn) =>
      btn.setButtonText("Cancelar").onClick(() => this.close())
    );
    new Setting(contentEl).addButton((btn) =>
      btn
        .setButtonText("Guardar configuración")
        .setCta()
        .onClick(() => {
          if (
            !codigoCurso ||
            !fechaInicioCurso ||
            !fechaFinCurso ||
            !codigo ||
            !denominacionCurso
          ) {
            new Notice("❌ Por favor completa los datos generales del curso.");
            return;
          }

          for (let i = 0; i < modulos.length; i++) {
            const modulo = modulos[i];
            if (
              !modulo.codigo ||
              !modulo.nombre ||
              !modulo.fechaInicio ||
              !modulo.fechaFin
            ) {
              new Notice(`❌ El módulo ${i + 1} tiene campos incompletos.`);
              return;
            }
          }

          this.close();
          this.onSubmit({
            codigoCurso,
            codigo,
            denominacionCurso,
            fechaInicioCurso,
            fechaFinCurso,
            numeroModulos,
            modulos,
          });
        })
    );
  }

  onClose() {
    this.contentEl.empty();
  }
}
