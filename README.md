# REST GOURMET - React Frontend

Este proyecto es la migración del frontend original de REST GOURMET (HTML/CSS/JS/JSP) a una Single Page Application (SPA) moderna utilizando **React JS**, cumpliendo con los estándares de diseño de lujo y funcionalidad requeridos.

## Tecnologías Utilizadas

- **React 18**: Biblioteca principal para la interfaz de usuario.
- **Vite**: Herramienta de construcción ultra rápida.
- **React Router DOM v6**: Gestión de enrutamiento y navegación.
- **Lucide React**: Set de iconos modernos y consistentes.
- **Framer Motion**: Animaciones fluidas para una experiencia gourmet.
- **Vanilla CSS**: Estilos personalizados manteniendo la identidad de marca.

## Estructura del Proyecto

- `/src/components/Layout`: Contiene los Layouts públicos y administrativos (Sidebar, Navbar, Footer).
- `/src/components/UI`: Componentes reutilizables como Modales y placeholders.
- `/src/pages/Public`: Vistas accesibles para clientes (Home, Login).
- `/src/pages/Admin`: Panel de control y módulos de gestión (Dashboard, Inventario, Reservas).
- `/src/App.jsx`: Definición de rutas y protección de acceso.

## Funcionalidades Implementadas

1. **Landing Page Gourmet**: Hero animado, menú destacado y formulario de reserva integrado.
2. **Sistema de Autenticación (Mock)**: Acceso restringido al panel administrativo (Credenciales: `admin@restgourmet.com` / `admin123`).
3. **Panel Administrativo**: 
   - Dashboard con métricas clave y acceso rápido a módulos.
   - **Gestión de Inventarios**: Tabla interactiva con búsqueda y alertas de stock bajo, más formulario de registro en modal.
   - **Control de Reservas**: Listado detallado de clientes con estados (Confirmada, Pendiente, Cancelada) y formulario de nueva reserva.
   - **Diseño Responsivo**: Adaptado para dispositivos móviles y escritorio.

## Cómo Ejecutar el Proyecto

1. Asegúrese de tener **Node.js** instalado.
2. Navegue a la carpeta del proyecto:
   ```bash
   cd rest-gourmet-react
   ```
3. Instale las dependencias:
   ```bash
   npm install
   ```
4. Inicie el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abra su navegador en la dirección indicada (usualmente `http://localhost:5173`).

---
Desarrollado como parte del componente formativo "Desarrollo de frontend con React JS".
