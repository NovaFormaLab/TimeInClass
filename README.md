# TimeInClass

**TimeInClass** es un complemento para [Obsidian](https://obsidian.md/) diseñado para registrar y controlar la **asistencia presencial** de alumnos en los **módulos formativos** de los Certificados de Profesionalidad. Este plugin permite a los formadores llevar un seguimiento preciso del tiempo de presencia de cada alumno, un factor clave para la obtención del certificado.

![Logo](img/TimeInClass.jpg)
---

## 🚀 Funcionalidades actuales

- 📥 Carga automática del **último archivo CSV** de la carpeta activa.
- 📊 Generación automática de **notas Markdown por curso**, estructuradas por año.
- 📆 División de la asistencia en **tablas mensuales**, con horas asistidas y porcentaje.
- ✅ Cálculo automático del **estado de asistencia** (`✅` si ≥75%, `❌` si no).
- 🗂 Organización de notas en subcarpetas (`Cursos/2024/Curso_2024_001456.md`)
- 🕓 Registro de la fecha y hora de generación de cada nota.

---
## 📂 Estructura de carpetas en la Vault

```
Cursos/
├── 2024/
│   ├── Curso_2024_001456.md
│   └── Curso_2024_001789.md
```


---

## 📄 Ejemplo de contenido generado

```markdown
# Curso 2024/001456

- 📅 Fecha de inicio: 2025-01-12
- 📅 Fecha de fin: 2025-03-15

## Asistencia para el mes: 2025-01

| Alumno                  | NIF         | Horas asistidas | % Asistencia | Estado |
|-------------------------|-------------|------------------|---------------|--------|
| JACINTO VALLEJO ESTEVE | 17136957W   | 77               | 81.9%         | ✅     |

## Asistencia para el mes: 2025-02

| Alumno                  | NIF         | Horas asistidas | % Asistencia | Estado |
|-------------------------|-------------|------------------|---------------|--------|
| JACINTO VALLEJO ESTEVE | 17136957W   | 85               | 85.9%         | ✅     |

---

🕓 Generado automáticamente el 07/04/2025 a las 14:25 con TimeInClass
```

---

## ⚙️ Requisitos

- Obsidian 1.0 o superior
- Node.js y TypeScript para desarrollo local
- Plugin habilitado en `.obsidian/plugins/TimeInClass/`

---

## 🧪 Funcionalidades futuras previstas

- [ ] Registro manual de sesiones desde un Modal
- [ ] Botones interactivos para marcar asistencia por alumno
- [ ] Exportación de informes en PDF y CSV
- [ ] Visualización gráfica del progreso por módulo o grupo
- [ ] Configuración de umbrales mínimos de asistencia por curso

---

## 🤝 Contribuciones

Si deseas colaborar, puedes abrir un issue o enviar un pull request. Toda ayuda es bienvenida.

---

## 📄 Licencia

Este proyecto está licenciado bajo la **GNU General Public License v3.0 (GPL-3.0)**.  
Consulta el archivo [`LICENSE`](./LICENSE) para más información.

2025 @ikikidev & NovaFormaLab
