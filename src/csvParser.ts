import Papa from "papaparse";

export interface AlumnoAsistencia {
  nombre: string;
  nif: string;
  mes: string; // <-- Añadido
  horasAsistidas: number;
  horasTotales: number;
  porcentajeAsistencia: number;
  observaciones?: string;
}

export interface ParsedCurso {
  codigo: string;
  fechaInicio: string;
  fechaFin: string;
  alumnos: AlumnoAsistencia[];
}

function parseNumeroEuropeo(valor: string | undefined): number {
  if (!valor) return 0;
  return parseFloat(valor.replace(",", "."));
}

export function parseCSVContent(csvText: string): ParsedCurso[] {
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true, delimiter: ";" });
  const cursos: Record<string, ParsedCurso> = {};

  for (const row of parsed.data as any[]) {
    const codCurso = row["Cod. Curso"];
    const alumno = row["Alumno"];
    if (!alumno || !codCurso) continue;

    const nif = row["NIF"];
    const mes = row["Mes"] || "Sin mes";
    const fechaInicio = row["Data inicio"];
    const fechaFin = row["Data fin"];

    const horasAsistidas = parseNumeroEuropeo(row["Horas asistidas presenciais"]);
    const horasAusencias = parseNumeroEuropeo(row["Horas ausencias xust. Presenciais"]) +
                           parseNumeroEuropeo(row["Horas ausencias NON xust. presenciais"]);
    const horasTotales = horasAsistidas + horasAusencias;
    const porcentaje = horasTotales > 0 ? (horasAsistidas / horasTotales) * 100 : 0;

    if (!cursos[codCurso]) {
      cursos[codCurso] = {
        codigo: codCurso,
        fechaInicio,
        fechaFin,
        alumnos: []
      };
    }

    cursos[codCurso].alumnos.push({
      nombre: alumno,
      nif,
      mes,
      horasAsistidas,
      horasTotales,
      porcentajeAsistencia: parseFloat(porcentaje.toFixed(2)),
      observaciones: row["Notas"] || undefined
    });
  }

  return Object.values(cursos);
}
