# TimeInClass

**TimeInClass** es un complemento para [Obsidian](https://obsidian.md/) diseñado para registrar y controlar la **asistencia presencial** de alumnos en los **módulos formativos** de los Certificados de Profesionalidad. Este plugin permite a los formadores llevar un seguimiento preciso del tiempo de presencia de cada alumno, un factor clave para la obtención del certificado.

---

## 🚀 Funcionalidades

- Registro de **inicio y fin** de sesiones presenciales por alumno y módulo.
- Cálculo automático del **tiempo total asistido** y del **porcentaje de asistencia**.
- Soporte para **múltiples módulos y grupos de alumnos**.
- Visualización clara del progreso de cada alumno.
- Generación de informes por alumno y módulo (Markdown, CSV o PDF).
- Interfaz integrada en Obsidian: comandos, botones, plantillas.

---

## 📂 Estructura de uso en Obsidian (Por el momento)

Una posible organización del contenido en la Vault:

```
Certificados/
├── IFCD0110/
│   ├── alumnos.md
│   ├── asistencia/
│   │   ├── alumno1.md
│   │   ├── alumno2.md
│   └── resumen.md
```

Cada nota de alumno incluye:

```markdown
## Módulo MF0950_2
- 🕒 Asistencia total: 24h / 30h
- ✅ % Asistencia: 80%
- 📅 Sesiones:
  - [2025-04-01] 09:00–13:00 (4h)
  - [2025-04-03] 09:00–13:00 (4h)
```

---

## 🛠 Requisitos

- Obsidian 1.0 o superior
- Node.js (para desarrollo)
- TypeScript

---

## 🧪 En desarrollo

Este plugin está en fase de desarrollo. Las siguientes funcionalidades están previstas:

- [ ] Registro de asistencia con botones de inicio/fin
- [ ] Cálculo automático de porcentajes
- [ ] Exportación a CSV y PDF
- [ ] Configuración personalizada por módulo
- [ ] Modo resumen por grupo o certificado

---

## 🤝 Contribuciones

Si deseas colaborar, puedes abrir un issue o enviar un pull request. Toda ayuda es bienvenida.

---

## 📄 Licencia

Este proyecto está licenciado bajo la **GNU General Public License v3.0 (GPL-3.0)**.  
Consulta el archivo [`LICENSE`](./LICENSE) para más información.

2025 @ikikidev & NovaFormaLab
