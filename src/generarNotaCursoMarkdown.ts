import { ParsedCurso } from "./csvParser";

export function generarNotaCursoMarkdown(curso: ParsedCurso): string {
  const { codigo, fechaInicio, fechaFin, alumnos } = curso;

  let md = `# Curso ${codigo}\n\n`;
  md += `- 📅 Fecha de inicio: ${fechaInicio}\n`;
  md += `- 📅 Fecha de fin: ${fechaFin}\n\n`;

  // Agrupar por mes
  const meses = Array.from(new Set(alumnos.map(a => a.mes))).sort();

  for (const mes of meses) {
    md += `## Asistencia para el mes: ${mes}\n\n`;
    md += `| Alumno | NIF | Horas asistidas | % Asistencia | Estado |\n`;
    md += `|--------|-----|------------------|---------------|--------|\n`;

    alumnos
      .filter(a => a.mes === mes)
      .forEach(alumno => {
        const estado = alumno.porcentajeAsistencia >= 75 ? "✅" : "❌";
        md += `| ${alumno.nombre} | ${alumno.nif} | ${alumno.horasAsistidas} | ${alumno.porcentajeAsistencia.toFixed(1)}% | ${estado} |\n`;
      });

    md += `\n`;
  }

  const fecha = new Date();
  const fechaStr = fecha.toLocaleDateString("es-ES");
  const horaStr = fecha.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' });

  md += `\n---\n\n`;
  md += `🕓 Generado automáticamente el ${fechaStr} a las ${horaStr} con TimeInClass\n`;

  return md;
}
