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

## ✅ Cambios recientes en TimeInClass

### ✔️ Módulos con duración específica
Cada módulo ahora incluye su propio campo `horasTotales`, configurable desde el modal. El cálculo de asistencia se realiza individualmente en base a ese valor.

### 📊 Informe con indicadores visuales
El informe de asistencia muestra un icono según el porcentaje de asistencia del alumno en cada módulo:

- ✅ 80 % o más
- ⚠️ entre 75 % y 79.99 %
- ❌ menos del 75 %

Esto permite una visualización rápida del estado de cada participante.

### 📝 Archivo configuracion.md mejorado
Al guardar un curso desde el modal, se genera automáticamente el archivo `configuracion.md` incluyendo el campo:

```
- Horas totales: XX
```

en cada bloque de módulo.

---

## 🔁 Flujo actualizado del plugin

1. **Configurar curso** desde el comando Obsidian.
2. Se genera automáticamente `configuracion.md` con estructura estandarizada.
3. Cargar un CSV desde el editor o dejar que el plugin use el más reciente en la carpeta del curso.
4. Ejecutar el comando de generación del informe.
5. Se crea `informe_asistencia.md` con datos, porcentajes y emojis visuales por módulo.

---

## ⚙️ COMANDOS DISPONIBLES

1. `⚙️ Configurar curso`
   - Crea `CursoConfig` y `configuracion.md`

2. `📂 Generar informe de asistencia desde CSV`
   - Usa `PromptModal` para introducir código de curso.
   - Carga CSV desde archivo activo.
   - Procesa y guarda informe Markdown.

🟢 Ambos comandos funcionan y están bien conectados.

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
- Generará un archivo de asistencia por cada curso:

```
Cursos/2025/001234/informe_asistencia.md
```

---

## 📦 Estructura de carpetas generada

```
Cursos/
└── 2025/
    └── 001234/
        ├── configuracion.md
        ├── informe_asistencia.md        
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

- `Data` (formato: dd/mm/yyyy)
- `Alumno`
- `NIF`
- `Horas asistidas presenciais`
- `Horas ausencias NON xust. presenciais`

> El plugin ignora datos virtuales o justificados si no se configuran explícitamente.

---

## 💻 Requisitos

- Obsidian (última versión recomendada)
- Archivo CSV exportado desde la plataforma SIFO

---

## 🛠️ Guía rápida: Instalar el plugin **TimeInClass** desde GitHub en Obsidian

Échale un vistazo a la [Guía rápida de TimeInClass](Guia-Rapida-Uso.md)

---

## 📃 Licencia

Este proyecto está bajo la [Licencia Pública General GNU v3.0](LICENSE).

© 2025 [ikikidev & NovaFormaLab](https://github.com/ikikidev)