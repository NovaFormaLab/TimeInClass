import Papa from "papaparse";

export interface RegistroDiarioAlumno {
  curso: string;
  grupo: string;
  nif: string;
  alumno: string;
  fecha: string; // formato DD/MM/YYYY
  horasAsistidas: number;
  horasAusenciaNoJustificada: number;
}

export function parseCSVContent(csvText: string): RegistroDiarioAlumno[] {
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    delimiter: ";"
  });

  const registros: RegistroDiarioAlumno[] = [];

  for (const row of parsed.data as any[]) {
    const curso = row["Cód. Curso"];
    const grupo = row["Nº Grupo"];
    const nif = row["NIF"];
    const alumno = row["Alumno"];
    const fecha = row["Data"];

    const horasAsistidas = parseNumeroEuropeo(row["Horas asistidas presenciais"]);
    const horasAusenciaNoJustificada = parseNumeroEuropeo(row["Horas ausencias NON xust. presenciais"]);

    if (curso && alumno && fecha) {
      registros.push({
        curso,
        grupo,
        nif,
        alumno,
        fecha,
        horasAsistidas,
        horasAusenciaNoJustificada
      });
    }
  }

  return registros;
}

function parseNumeroEuropeo(valor: string | undefined): number {
  if (!valor || valor.trim() === "") return 0;
  return parseFloat(valor.replace(",", "."));
}