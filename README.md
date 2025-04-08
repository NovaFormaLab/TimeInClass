# ⏱️ TimeInClass – Plugin de Obsidian

![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-FFD6A5)
![Versión](https://img.shields.io/badge/Versión-v0\.1\.0-FDFFB6)
![Licencia](https://img.shields.io/badge/Licencia-GPL--3\.0-CAFFBF)
![CSV](https://img.shields.io/badge/Datos-Cargados%20desde%20CSV-9BF6FF)
![Asistencia](https://img.shields.io/badge/%F0%9F%93%85%20Asistencia-Activa-A0C4FF)
![Construido con TypeScript](https://img.shields.io/badge/construido%20con-TypeScript-C1D3FE?logo=typescript&logoColor=white)
![Obsidian](https://img.shields.io/badge/Obsidian-Plugin-BDB2FF)
![Cute](https://img.shields.io/badge/🦄%20CyberCute-Approved-FFC6FF)
![Desarrollado](https://img.shields.io/badge/Desarrollado-@ikikidev%20en%20NovaFormaLab-ffc0cb)

**TimeInClass** es un plugin para Obsidian que permite **gestionar la asistencia en cursos de formación profesional (SIFO)** a partir de archivos CSV exportados por las plataformas oficiales.

Está diseñado especialmente para certificados de profesionalidad y formación subvencionada, donde es obligatorio controlar la asistencia por módulo y por alumno.

![Logo](img/TimeInClass.jpg)
---

## ⚙️ Funcionalidades

- 🗂️ **Configuración de cursos y módulos** con fechas de inicio/fin
- 📅 **Generación automática de hojas de asistencia** por alumno
- 📊 Cálculo del **porcentaje de asistencia por módulo**
- ✅ Asignación automática de estado (✔️/❌) según porcentaje
- 🧾 Exportación en formato Markdown organizada por curso
- 📁 Estructura de carpetas por año y código de curso
- 🔄 Edición de cursos ya configurados

---

## 🛠️ Cómo se usa

### 1. Configurar un curso

Ejecuta el comando:

```
⚙️ Configurar curso (fechas y módulos)
```

1. Se te pedirá el **código del curso** (Ej: `2025/001234`).
2. Si ya lo habías configurado, cargará los datos anteriores.
3. Introduce la información del curso y sus módulos.
4. Se generará un archivo `configuracion.md` en:

```
Cursos/2025/001234/configuracion.md
```

---

### 2. Procesar un CSV

Coloca el CSV del curso en una carpeta y abre cualquier archivo dentro de ella.

Luego ejecuta:

```
📂 Generar notas desde CSV (SIFO)
```

El plugin:

- Detectará el CSV más reciente en esa carpeta
- Identificará el curso
- Leerá la configuración desde `cursoConfigs` o desde el `.md`
- Generará un archivo de asistencia por cada alumno:

```
Cursos/2025/001234/asistencia_12345678A.md
```

---

## 📦 Estructura de carpetas generada

```
Cursos/
└── 2025/
    └── 001234/
        ├── configuracion.md
        ├── asistencia_12345678A.md
        ├── asistencia_87654321B.md
        └── ...
```

---

## 📐 Cálculo de asistencia

Cada módulo tiene su intervalo de fechas (inicio/fin). El plugin:

- Calcula los días lectivos reales (de lunes a viernes)
- Estima la asistencia del alumno dividiendo las horas asistidas entre las horas/día (configurado como 5 h por defecto)
- Evalúa si el alumno ha superado el 75 % del módulo

---

## 🧪 Formato de CSV esperado

- Cod. Curso
- Nombre alumno
- NIF
- Mes (YYYY-MM)
- Horas asistidas

---

## 💻 Requisitos

- Obsidian (última versión recomendada)
- Modo de desarrollador activo
- Archivo CSV exportado desde la plataforma SIFO

---

## 📃 Licencia

Este proyecto está bajo la [Licencia Pública General GNU v3.0](LICENSE).

© 2025 [ikikidev & NovaFormaLab](https://github.com/ikikidev)