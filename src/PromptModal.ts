import { App, Modal, Setting } from "obsidian";

export class PromptModal extends Modal {
  constructor(
    app: App,
    private promptText: string,
    private onSubmit: (value: string) => void
  ) {
    super(app);
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: this.promptText });

    let inputValue = "";

    new Setting(contentEl)
      .addText((text) => text
        .setPlaceholder("Ej: 2025/001234")
        .onChange((val) => inputValue = val))
      .addButton((btn) => btn
        .setButtonText("Continuar")
        .setCta()
        .onClick(() => {
          this.close();
          this.onSubmit(inputValue.trim());
        }));
  }

  onClose() {
    this.contentEl.empty();
  }
}
