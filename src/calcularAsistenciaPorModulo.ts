import { CursoConfig } from "./CourseConfigModal";
import { contarDiasHabiles } from "./utils/diasHabiles";

interface FilaAsistencia {
  nif: string;
  alumno: string;
  mes: string; // "2025-01"
  horas: number;
}

export interface AsistenciaModulo {
  nombreModulo: string;
  codigoModulo: string;
  porcentajeAsistencia: number;
  diasEsperados: number;
  diasAsistidosEstimados: number;
}

export function calcularAsistenciaPorModulo(
  config: CursoConfig,
  asistenciaAlumno: FilaAsistencia[],
  horasPorDia: number = 5 // configurable si quieres
): AsistenciaModulo[] {
  const resultado: AsistenciaModulo[] = [];

  for (const modulo of config.modulos) {
    const fechaInicio = new Date(modulo.fechaInicio);
    const fechaFin = new Date(modulo.fechaFin);
    const diasLectivos = contarDiasHabiles(fechaInicio, fechaFin);

    const mesesModulo = obtenerMesesDentroDeIntervalo(fechaInicio, fechaFin);

    const filasModulo = asistenciaAlumno.filter(f =>
      mesesModulo.includes(f.mes)
    );

    const totalHoras = filasModulo.reduce((acc, f) => acc + f.horas, 0);
    const diasEstimadosAsistidos = totalHoras / horasPorDia;

    const porcentaje = Math.min((diasEstimadosAsistidos / diasLectivos) * 100, 100);

    resultado.push({
      nombreModulo: modulo.nombre,
      codigoModulo: modulo.codigo,
      porcentajeAsistencia: Math.round(porcentaje * 10) / 10,
      diasEsperados: diasLectivos,
      diasAsistidosEstimados: Math.round(diasEstimadosAsistidos * 10) / 10
    });
  }

  return resultado;
}

function obtenerMesesDentroDeIntervalo(inicio: Date, fin: Date): string[] {
  const meses: Set<string> = new Set();
  let actual = new Date(inicio);
  while (actual <= fin) {
    const mes = actual.toISOString().slice(0, 7); // "YYYY-MM"
    meses.add(mes);
    actual.setMonth(actual.getMonth() + 1);
  }
  return Array.from(meses);
}
