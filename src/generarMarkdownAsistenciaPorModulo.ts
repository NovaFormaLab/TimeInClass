import { AsistenciaModulo } from "./calcularAsistenciaPorModulo";

export function generarMarkdownAsistenciaPorModulo(
  alumno: { nombre: string; nif: string },
  modulos: AsistenciaModulo[]
): string {
  let md = `# Asistencia por módulo\n\n`;
  md += `- 👤 Alumno: ${alumno.nombre}\n`;
  md += `- 🆔 NIF: ${alumno.nif}\n\n`;

  modulos.forEach(mod => {
    const estado = mod.porcentajeAsistencia >= 75 ? "✅" : "❌";
    md += `## ${mod.nombreModulo} (${mod.codigoModulo})\n`;
    md += `- 📅 Días previstos: ${mod.diasEsperados}\n`;
    md += `- 🕒 Días estimados asistidos: ${mod.diasAsistidosEstimados}\n`;
    md += `- 📊 Porcentaje: ${mod.porcentajeAsistencia}% → ${estado}\n\n`;
  });

  const ahora = new Date();
  md += `---\n🕓 Generado el ${ahora.toLocaleDateString("es-ES")} a las ${ahora.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })} con TimeInClass\n`;

  return md;
}
