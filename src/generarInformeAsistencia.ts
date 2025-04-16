import { App, TFile, Vault } from "obsidian";
import { generarMarkdownAsistenciaPorModulo } from "./generarMarkdownAsistenciaPorModulo";
import { AsistenciaPorModulo } from "./calcularAsistenciaPorModulo";

export async function guardarInformeAsistencia(
  vault: Vault,
  rutaDirectorioCurso: string,
  resultados: AsistenciaPorModulo[]
): Promise<void> {
  const contenido = generarMarkdownAsistenciaPorModulo(resultados);
  const rutaInforme = `${rutaDirectorioCurso}/informe_asistencia.md`;

  const archivoExistente = vault.getAbstractFileByPath(rutaInforme);

  if (archivoExistente instanceof TFile) {
    await vault.modify(archivoExistente, contenido);
  } else {
    await vault.create(rutaInforme, contenido);
  }
}
