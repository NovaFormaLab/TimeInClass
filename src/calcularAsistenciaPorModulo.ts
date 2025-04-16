import { RegistroDiarioAlumno } from "./csvParser";
import { ModuloCurso } from "./utils/parseConfiguracionMarkdown";

export interface AsistenciaPorModulo {
  modulo: ModuloCurso;
  alumnos: {
    nombre: string;
    nif: string;
    horasAsistidas: number;
    horasAusenciaNoJustificada: number;
    porcentaje: number;
  }[];
}

export function calcularAsistenciaPorModulo(
  registros: RegistroDiarioAlumno[],
  modulos: ModuloCurso[]
): AsistenciaPorModulo[] {
  const resultados: AsistenciaPorModulo[] = [];

  for (const modulo of modulos) {
    const alumnosMap = new Map<string, {
      nombre: string;
      nif: string;
      horasAsistidas: number;
      horasAusenciaNoJustificada: number;
    }>();

    for (const registro of registros) {
      const fechaRegistro = parseFecha(registro.fecha);

      if (fechaRegistro >= modulo.fechaInicio && fechaRegistro <= modulo.fechaFin) {
        const key = registro.nif;
        const actual = alumnosMap.get(key) || {
          nombre: registro.alumno,
          nif: registro.nif,
          horasAsistidas: 0,
          horasAusenciaNoJustificada: 0,
        };

        actual.horasAsistidas += registro.horasAsistidas;
        actual.horasAusenciaNoJustificada += registro.horasAusenciaNoJustificada;

        alumnosMap.set(key, actual);
      }
    }

    const alumnos = Array.from(alumnosMap.values()).map(a => ({
      ...a,
      porcentaje: modulo.horasTotales > 0 ? (a.horasAsistidas / modulo.horasTotales) * 100 : 0,
    }));

    resultados.push({ modulo, alumnos });
  }

  return resultados;
}

function parseFecha(fechaStr: string): Date {
  const [dia, mes, anio] = fechaStr.split("/").map(Number);
  return new Date(anio, mes - 1, dia);
}
