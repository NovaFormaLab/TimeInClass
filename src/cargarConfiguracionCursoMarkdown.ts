import { TFile, Vault } from "obsidian";
import { parseConfiguracionMarkdown, ModuloCurso } from "./utils/parseConfiguracionMarkdown";

export async function cargarConfiguracionCursoMarkdown(
  vault: Vault,
  rutaArchivo: string
): Promise<ModuloCurso[] | null> {
  const file = vault.getAbstractFileByPath(rutaArchivo);
  if (!(file instanceof TFile)) return null;

  const contenido = await vault.read(file);
  return parseConfiguracionMarkdown(contenido);
}
