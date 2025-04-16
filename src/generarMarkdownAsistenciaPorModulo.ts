import { AsistenciaPorModulo } from "./calcularAsistenciaPorModulo";

function getAsistenciaEmoji(porcentaje: number): string {
  if (porcentaje >= 80) return "✅";
  if (porcentaje >= 75) return "⚠️";
  return "❌";
}


export function generarMarkdownAsistenciaPorModulo(resultados: AsistenciaPorModulo[]): string {
  let markdown = `# Informe de Asistencia por Módulo\n\n`;

  for (const resultado of resultados) {
    markdown += `## ${resultado.modulo.codigo} - ${resultado.modulo.nombre}\n`;
    markdown += `\n- 🗓️ Del ${formatearFecha(resultado.modulo.fechaInicio)} al ${formatearFecha(resultado.modulo.fechaFin)}\n`;
    markdown += `\n- ⏳ Horas totales del modulo: ${resultado.modulo.horasTotales}\n`;
    markdown += `\n| Alumno | NIF | Horas Asistidas | Ausencias NO Justificadas | % Asistencia |\n`;
    markdown += `|--------|-----|------------------|----------------------------|---------------|\n`;

    for (const alumno of resultado.alumnos) {
      const emoji = getAsistenciaEmoji(alumno.porcentaje);
      markdown += `| ${alumno.nombre} | ${alumno.nif} | ${alumno.horasAsistidas.toFixed(2)} | ${alumno.horasAusenciaNoJustificada.toFixed(2)} | ${emoji} ${alumno.porcentaje.toFixed(2)}% |\n`;
    }

    markdown += `\n---\n\n`;
  }

  return markdown;
}

function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
