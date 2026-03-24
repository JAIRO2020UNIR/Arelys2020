# REST GOURMET API - Sistema de Gestión de Restaurante

Esta API proporciona los servicios necesarios para el sistema de gestión de un restaurante gourmet, basándose en los requerimientos del proyecto "Rest Gourmet" desarrollado en React.

## Tecnologías Utilizadas
- **Node.js**: Entorno de ejecución.
- **Express**: Framework para la construcción de la API REST.
- **CORS**: Middleware para permitir peticiones desde el frontend.
- **Dotenv**: Gestión de variables de entorno.
- **Persistence**: Almacenamiento basado en archivos JSON para demostración.

## Instalación y Ejecución

1. Entrar en la carpeta de la API:
   ```bash
   cd rest-gourmet-api
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el servidor:
   ```bash
   npm start
   ```
   *Nota: Por defecto corre en `http://localhost:5000`*

## Endpoints Principales

### 1. Autenticación y Usuarios
- `POST /api/users/login`: Iniciar sesión.
- `GET /api/users`: Obtener lista de usuarios (solo admin).
- `POST /api/users`: Crear nuevo usuario.

### 2. Gestión del Menú (Carta)
- `GET /api/menu`: Listar todos los platos.
- `POST /api/menu`: Agregar un nuevo plato.
- `PUT /api/menu/:id`: Editar un plato existente.
- `DELETE /api/menu/:id`: Eliminar un plato.

### 3. Gestión de Pedidos
- `GET /api/orders`: Ver todos los pedidos pendientes y activos.
- `POST /api/orders`: Crear un nuevo pedido desde la mesa.
- `PATCH /api/orders/:id/status`: Actualizar el estado del pedido (En Cocina, Entregado, Pagado).

### 4. Reservas (Próximamente)
- `GET /api/reservations`: Listar reservas.
- `POST /api/reservations`: Crear reserva desde la web.

## Modelos de Datos

### Plato (Menu Item)
```json
{
  "id": 1234567,
  "name": "Nombre del Plato",
  "category": "Plato Fuerte",
  "price": 32000
}
```

### Pedido (Order)
```json
{
  "id": 101,
  "table": "Mesa 4",
  "items": ["Plato 1", "Plato 2"],
  "total": 55000,
  "status": "En Cocina",
  "notes": "Sin cebolla"
}
```

## Estructura del Proyecto
- `/controllers`: Lógica de negocio.
- `/routes`: Definición de rutas y endpoints.
- `/utils`: Funciones auxiliares (manejo de archivos).
- `/data`: Base de datos simulada en archivos JSON.
- `index.js`: Punto de entrada de la aplicación.
