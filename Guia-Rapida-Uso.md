## 🛠️ Guía rápida: Instalar el plugin **TimeInClass** desde GitHub en Obsidian

### ✅ Requisitos previos

- Tener instalado **Obsidian** en tu equipo.
- Tener un **Vault (espacio de trabajo)** creado.
- Activar los **plugins de terceros** en la configuración de Obsidian.

---

### 🔓 Paso 1: Habilitar plugins de terceros

1. Abre Obsidian.
2. Ve a **Ajustes → Plugins de Comunidad**.
3. Activa la opción **“Permitir plugins de terceros”**.
4. Haz clic en **“Abrir carpeta de plugins”** (esto abrirá una carpeta de tu sistema).

---

### 📦 Paso 2: Descargar la última versión del plugin desde GitHub

1. Accede a la sección de releases del repositorio:
   👉 [https://github.com/NovaFormaLab/TimeInClass/releases](https://github.com/NovaFormaLab/TimeInClass/releases)
2. Haz clic en la última versión publicada (por ejemplo `v0.1.0`).
3. Descarga los archivos:
   - `main.js`
   - `manifest.json`
4. Crea una carpeta con nombre `TimeInClass` dentro de la carpeta de plugins y coloca ambos archivos dentro.

   👉 Ruta típica:  
   `TuVault/.obsidian/plugins/TimeInClass/`

---

### 🔄 Paso 3: Activar el plugin en Obsidian

1. Regresa a Obsidian.
2. Ve a **Ajustes → Plugins de Comunidad**.
3. Haz clic en **“Plugins instalados”**.
4. Busca **“TimeInClass”** en la lista y actívalo ✅.

---

### 🎉 ¡Listo!

El plugin ya está disponible en Obsidian. Puedes usar los comandos:

- `⚙️ Configurar curso (fechas y módulos)`
- `📂 Generar informe de asistencia desde CSV`

desde el **lanzador de comandos** (`Ctrl+P` o `Cmd+P`) o asignarles atajos.

---

### 🧭 Consejo final

Guarda tus archivos CSV dentro de la carpeta del curso creada por el plugin, para que pueda detectarlos automáticamente. El informe se generará en Markdown listo para imprimir, compartir o exportar como PDF.
