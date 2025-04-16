export interface ModuloCurso {
    codigo: string;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    horasTotales: number;
  }
  
  export function parseConfiguracionMarkdown(markdown: string): ModuloCurso[] {
    const moduloRegex = /## Módulo \d+:\s*(.*?)\n- Código: (.*?)\n- Inicio: (.*?)\n- Fin: (.*?)\n- Horas totales: (\d+)/g;
  
    const modulos: ModuloCurso[] = [];
    let match;
  
    while ((match = moduloRegex.exec(markdown)) !== null) {
      const nombre = match[1].trim();
      const codigo = match[2].trim();
      const fechaInicio = parseFecha(match[3].trim());
      const fechaFin = parseFecha(match[4].trim());
      const horasTotales = parseInt(match[5].trim());
  
      modulos.push({ codigo, nombre, fechaInicio, fechaFin, horasTotales });
    }
  
    return modulos;
  }
  
  
  function parseFecha(fechaStr: string): Date {
    if (fechaStr.includes("/")) {
      const [dia, mes, anio] = fechaStr.split("/").map(Number);
      return new Date(anio, mes - 1, dia);
    } else {
      return new Date(fechaStr);
    }
  }
  