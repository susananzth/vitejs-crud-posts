# 🚀 Data Grid CRUD de Posts con Vite.js

![Badge de JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Badge de React](https://img.shields.io/badge/React-Hooks-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Badge de Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Badge de Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Badge de Estado](https://img.shields.io/badge/Status-Completado-28a745?style=for-the-badge)

---

## 🌟 Descripción del Proyecto

Este proyecto es una **Single Page Application (SPA)** construida con **Vite.js** y **React** que demuestra la implementación de un **Data Grid Avanzado** consumiendo una API REST pública (JSONPlaceholder).

El enfoque principal de este proyecto es la aplicación de **Principios de Programación Senior** y **Patrones de Diseño** en componentes de React, destacando:

1.  **Separación de Responsabilidades (SRP):** Uso del Custom Hook **`useDataGrid`** para encapsular toda la lógica de gestión de estado (búsqueda, ordenamiento, paginación), aislando la lógica del componente de presentación (`PostTable`).
2.  **Rendimiento y Optimización:** Uso estratégico de los *Hooks* de React (`useMemo`, `useCallback`) para memorizar cálculos pesados (filtrado, ordenamiento) y prevenir re-renderizados innecesarios.
3.  **UI/UX Avanzada:** Implementación de funcionalidades críticas en la gestión de datos:
    * **Búsqueda Dinámica** en tiempo real.
    * **Ordenamiento por Columna** (ASC/DESC).
    * **Paginación Inteligente** con selección de `per_page`.
4.  **Diseño Modular:** Componentes reutilizables (`Button`, `Input`, `Pagination`) con estilos consistentes a través de **Tailwind CSS**.

### 💻 Live Demo

Puedes ver el proyecto funcionando en:
[🔗 Visita la Data Grid de Posts](https://susananzth.com/vitejs-crud-posts)

---
## ⚙️ Guía de Ejecución Local

Sigue estos pasos para levantar el proyecto en tu máquina local.

### 1. Requisitos

Asegúrate de tener instalado:
* [Node.js](https://nodejs.org/es/) (versión LTS recomendada)
* [npm](https://www.npmjs.com/) (o Yarn / pnpm)

### 2. Clonar el Repositorio

Abre tu terminal y ejecuta:

```bash
git clone https://github.com/susananzth/vitejs-crud-posts.git
cd vitejs-crud-posts
```
### 3. Instalar Dependencias

Instala todos los paquetes necesarios del proyecto.

```bash
npm install
# o yarn install
```

### 4. Ejecutar el Proyecto

Inicia el servidor de desarrollo de Vite.

```bash
npm run dev
```
