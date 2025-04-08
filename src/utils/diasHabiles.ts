export function contarDiasHabiles(inicio: Date, fin: Date): number {
    let total = 0;
    let actual = new Date(inicio);
  
    while (actual <= fin) {
      const dia = actual.getDay();
      if (dia !== 0 && dia !== 6) total++; // Excluir domingos (0) y sábados (6)
      actual.setDate(actual.getDate() + 1);
    }
  
    return total;
  }
  