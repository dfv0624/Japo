# Japo • みんなの日本語 — Aprendizaje Interactivo

Aplicación web interactiva, moderna y minimalista diseñada especialmente para **tablets**, orientada a la práctica intensiva y comprensión profunda del idioma japonés basada en las **Lecciones 1 y 2 de *Minna no Nihongo***.

---

## 🎯 Visión y Enfoque del Proyecto

El objetivo de **Japo** es proporcionar un entorno de estudio libre de distracciones, sobrio y altamente interactivo en blanco y negro (estética monocromática Zen). La aplicación combina múltiples dinámicas de aprendizaje activo: desde el dominio de los silabarios básicos y sus excepciones fonéticas, hasta la construcción de oraciones, discriminación de partículas y roleplay conversacional.

---

## ✨ Características Principales

### 1. 🔤 Silabarios: Hiragana & Katakana (`かな練習`)
- **Práctica Aleatoria Dinámica (Drill Mode)**: Tarjetas aleatorias de opción múltiple con feedback inmediato.
- **Dos sentidos de práctica**: `Kana → Romaji` y `Romaji → Kana`.
- **Filtro de "Solo Excepciones"**: Permite enfocar el entrenamiento exclusivamente en los caracteres y usos irregulares.
- **Excepciones Fonéticas y Gramaticales Destacadas**:
  - `し (shi)` / `シ`: No existe "si" en la fila Sa, siempre es *SHI*.
  - `ち (chi)` / `チ`: No existe "ti", se pronuncia *CHI*.
  - `つ (tsu)` / `ツ`: No existe "tu", se pronuncia *TSU*.
  - `ふ (fu)` / `フ`: Soplo bilabial suave *FU*.
  - `は`: Como palabra se lee *HA*, pero como partícula de tema se pronuncia **WA**.
  - `へ`: Como palabra se lee *HE*, pero como partícula de dirección se pronuncia **E**.
  - `を`: Reservada exclusivamente como partícula de objeto directo, pronunciada **O**.
  - `ん / ン`: Única consonante que se escribe y pronuncia de forma aislada.
  - `じ / ぢ` y `ず / づ`: Casos especiales de sonorización.
  - `っ / ッ (Sokuon)`: Pausa corta que duplica la consonante siguiente.
  - `ー (Chouonpu)`: Guion que alarga la vocal precedente en Katakana.
- **Silabario Completo Interactivo (Chart Mode)**: Matriz completa de Gojūon, Dakuten y Handakuten con reproducción de audio nativo al tocar cualquier carácter.

### 2. 🗂 Flashcards 3D con Filtros Inteligentes
- Volteo táctil 3D para evaluar lectura, significado en español y ejemplos.
- **Filtros dinámicos contextuales**: Solo se muestran las categorías que realmente contienen palabras en la lección seleccionada.
- Marcado de vocabulario favorito (`starred`) y seguimiento de palabras dominadas (`mastered`).

### 3. 🧩 Constructor de Frases (`文を作る`)
- Ejercicios interactivos de ordenar bloques táctiles para estructurar oraciones gramaticalmente correctas en japonés (orden `SOV`, tema `は`, cópula `です`, etc.).

### 4. 助 Reto de Partículas (`助詞マスター`)
- Desafíos focalizados en las partículas fundamentales del *Minna no Nihongo*:
  - **`は`** (Marcador de tema).
  - **`も`** (Partícula de adición "también").
  - **`の`** (Posesión, pertenencia y origen).
  - **`か`** (Partícula interrogativa final).
- Explicaciones gramaticales detalladas en cada respuesta.

### 5. 📍 Entrenador de Demostrativos (`これ・それ・あれ`)
- Simulador visual interactivo que enseña la relación de cercanía espacial y contextual:
  - **Serie Ko-So-A-Do**: `これ` (aquí cerca de mí), `それ` (ahí cerca de ti), `あれ` (allá lejos de ambos), `どれ` (cuál).
  - **Determinantes directos**: `この` + sustantivo, `その` + sustantivo, `あの` + sustantivo, `どの` + sustantivo.

### 6. 💬 Diálogos Reales Minna no Nihongo (`会話`)
- Conversaciones contextualizadas:
  - *Presentación en la empresa IMC* (Miller-san).
  - *Saludo de cortesía a los vecinos* (Bienvenida en el apartamento).
  - *El paraguas olvidado* (Uso de demostrativos y posesivos en recepción).
- Modos bilingües, alternador de guiones y audio de pronunciación por línea.

### 7. 📝 Examen Rápido (`テスト`)
- Test de evaluación de 10 preguntas con puntuación, tiempo y recomendaciones de refuerzo personalizadas.

### 8. 📚 Guía Gramatical & 📖 Vocabulario
- **Guía Gramatical**: Explicaciones claras de patrones `A は B です`, `A は B じゃありません`, oraciones interrogativas y cortesía.
- **Vocabulario**: Buscador instantáneo con pronunciación por voz y furigana visual.

---

## 🎨 Principios de Diseño y UX/UI

- **Estética Monocromática Zen**: Paleta sobria basada en blanco `#FFFFFF`, negro `#000000` y grises sutiles, eliminando distracciones visuales.
- **Furigana Visual Dinámico**: Implementado con etiquetas nativas HTML5 `<ruby><rt>`, permitiendo alternar globalmente entre `Kanji + Furigana` y `Solo Hiragana`.
- **Barra de Navegación Compacta en 1 Sola Fila**:
  - Selector de Área en botón de píldora a la izquierda: **`Fundamentos ▾`**, **`Práctica Gramatical ▾`** e **`Inmersión & Test ▾`**.
  - Botones táctiles de píldora en el centro (`border-radius: var(--radius-full)`) para cambiar de actividad inmediatamente.
  - Botón **`Todos (9)`** con icono `apps` para ver el mapa general de actividades en modal táctil.
- **Audio Nativo Japonés**: Integración con la Web Speech API (`SpeechSynthesis`) en idioma `ja-JP` con alternador de velocidad (1.0x normal / 0.75x pausado).
- **Iconografía Estándar**: Google Material Symbols Outlined (sin uso de emojis informales).
- **Diseñado para Tablets**: Zonas de toque amplias (mínimo 44px - 48px), responsive para orientación vertical u horizontal sin recortes laterales.

---

## 🛠️ Stack Tecnológico

- **Framework**: [Angular 22](https://angular.dev/)
  - Componentes Standalone (v22 default).
  - Reactividad basada en **Signals** (`signal()`, `computed()`, `effect()`).
  - Control Flow nativo (`@if`, `@for`, `@switch`).
  - Cero directivas obsoletas (`ngClass`/`ngStyle` reemplazadas por class/style bindings nativos).
  - Optimización de imágenes con `NgOptimizedImage`.
- **Lenguaje**: TypeScript en modo estricto (`strict: true`).
- **Estilos**: CSS modular con variables de diseño (Design Tokens) y arquitectura limpia.
- **Pruebas**: [Vitest](https://vitest.dev/) integrado con Angular CLI.

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 20 o superior).
- npm (versión 10 o superior).

### 1. Clonar el repositorio o ingresar al directorio:
```bash
cd Japo
```

### 2. Instalar dependencias:
```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo:
```bash
npm start
# o alternativamente:
ng serve
```
Abre tu navegador en [http://localhost:4200/](http://localhost:4200/). La aplicación se recarga automáticamente ante cualquier cambio en el código fuente.

---

## 🧪 Pruebas Unitarias

Para ejecutar la suite de pruebas unitarias con Vitest:

```bash
npm run test -- --watch=false
```

---

## 📦 Compilación para Producción

Para compilar el proyecto y generar los artefactos optimizados en la carpeta `dist/Japo`:

```bash
npm run build
```

---

## 📂 Estructura del Código Fuente

```text
src/
├── app/
│   ├── components/
│   │   ├── demonstrative-trainer/   # Demostrativos (これ・それ・あれ)
│   │   ├── dialogue-trainer/        # Diálogos interactivos Minna no Nihongo
│   │   ├── dictionary/              # Lista de vocabulario y buscador
│   │   ├── flashcards/              # Tarjetas de memoria 3D
│   │   ├── grammar-guide/           # Resumen de notas gramaticales
│   │   ├── header/                  # Encabezado minimalista con logo y toggles
│   │   ├── kana-trainer/            # Entrenador de Hiragana y Katakana + excepciones
│   │   ├── navigation-tabs/         # Barra compacta de 1 fila con selector de área
│   │   ├── particle-trainer/        # Reto interactivo de partículas (は, も, の, か)
│   │   ├── quiz/                    # Examen rápido de 10 preguntas
│   │   └── sentence-builder/        # Constructor de oraciones con bloques táctiles
│   ├── data/
│   │   ├── kana-data.ts             # Base de datos de Hiragana, Katakana y excepciones
│   │   └── lessons-data.ts          # Vocabulario, oraciones, ejercicios de Lecciones 1 y 2
│   ├── models/
│   │   └── japanese.models.ts       # Tipos e interfaces de TypeScript
│   ├── services/
│   │   ├── speech.service.ts        # Wrapper de síntesis de voz Web Speech API (ja-JP)
│   │   └── study-progress.service.ts# Estado global con Signals y persistencia local
│   ├── app.ts / app.html / app.css  # Shell principal de la aplicación
├── index.html                       # Fuentes de Google y enlaces a Material Symbols
└── styles.css                       # Sistema de diseño monocromático y variables CSS
```

---

## 📝 Licencia

Proyecto educativo para el aprendizaje del idioma japonés basado en la metodología *Minna no Nihongo*.
