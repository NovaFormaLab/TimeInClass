import { CursoConfig } from "./CourseConfigModal";

export function generarMarkdownCurso(config: CursoConfig): string {
  let md = `# Curso ${config.codigoCurso}\n\n`;

  md += `- 📅 **Inicio del curso:** ${config.fechaInicioCurso}\n`;
  md += `- 📅 **Fin del curso:** ${config.fechaFinCurso}\n`;
  md += `- 📚 **Módulos:** ${config.modulos.length}\n\n`;

  config.modulos.forEach((mod, i) => {
    md += `## Módulo ${i + 1}: ${mod.nombre}\n`;
    md += `- Código: ${mod.codigo}\n`;
    md += `- Inicio: ${mod.fechaInicio}\n`;
    md += `- Fin: ${mod.fechaFin}\n`;
    md += `- Horas totales: ${mod.horasTotales}\n\n`; // ✅ Línea clave
  });

  const fecha = new Date();
  const fechaStr = fecha.toLocaleDateString("es-ES");
  const horaStr = fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

  md += `---\n🕓 Configuración generada el ${fechaStr} a las ${horaStr} con TimeInClass\n`;

  return md;
}

