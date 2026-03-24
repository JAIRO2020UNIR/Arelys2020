# Documentación Técnica de Servicios Web (API) - Rest Gourmet

Esta documentación detalla los servicios web (API REST) desarrollados para el proyecto formativo, basándose en el diseño y lógica de la aplicación React.

## 1. Módulo de Autenticación y Usuarios
Servicios encargados de gestionar el acceso al sistema y la administración de personal.

| Método | Endpoint | Descripción | Cuerpo (Input) | Respuesta (Output) |
|---|---|---|---|---|
| POST | `/api/users/login` | Valida credenciales de acceso. | `{email, password}` | `{user, message}` |
| GET | `/api/users` | Lista todos los usuarios registrados. | N/A | `Array[Users]` |
| POST | `/api/users` | Registra un nuevo empleado. | `{name, email, password, role}` | `{newUser}` |

---

## 2. Módulo de Menú (Carta)
Servicios para la gestión de los platos ofrecidos por el restaurante.

| Método | Endpoint | Descripción | Cuerpo (Input) | Respuesta (Output) |
|---|---|---|---|---|
| GET | `/api/menu` | Obtiene todos los platos de la carta. | N/A | `Array[Items]` |
| POST | `/api/menu` | Agrega un nuevo plato. | `{name, category, price}` | `{newItem}` |
| PUT | `/api/menu/:id` | Actualiza datos de un plato. | `{name, price, ...}` | `{updatedItem}` |
| DELETE | `/api/menu/:id` | Elimina un plato de la carta. | N/A | `{message}` |

---

## 3. Módulo de Pedidos y Cocina
Controla el flujo de las órdenes desde la mesa hasta la entrega.

| Método | Endpoint | Descripción | Cuerpo (Input) | Respuesta (Output) |
|---|---|---|---|---|
| GET | `/api/orders` | Lista los pedidos activos. | N/A | `Array[Orders]` |
| POST | `/api/orders` | Crea un nuevo pedido. | `{table, items, total, notes}` | `{newOrder}` |
| PATCH | `/api/orders/:id/status` | Cambia estado (En Cocina/Entregado). | `{status}` | `{updatedOrder}` |

---

## 4. Módulo de Reservas
Gestión de reservas realizadas por clientes externos o registro manual.

| Método | Endpoint | Descripción | Cuerpo (Input) | Respuesta (Output) |
|---|---|---|---|---|
| GET | `/api/reservations` | Lista todas las reservas. | N/A | `Array[Res]` |
| POST | `/api/reservations` | Registra una nueva reserva. | `{client, date, time, pax}` | `{newRes}` |
| PATCH | `/api/reservations/:id/confirm` | Confirma una reserva pendiente. | N/A | `{updatedRes}` |

---

## 5. Módulo de Inventario
Control de insumos y stock gourmet.

| Método | Endpoint | Descripción | Cuerpo (Input) | Respuesta (Output) |
|---|---|---|---|---|
| GET | `/api/inventory` | Consulta el stock actual. | N/A | `Array[Stock]` |
| POST | `/api/inventory` | Registra entrada de nuevo insumo. | `{name, quantity, unit}` | `{newItem}` |
| PATCH | `/api/inventory/:id/stock` | Actualiza la cantidad disponible. | `{quantity}` | `{updatedItem}` |

---

## 6. Módulo de Facturación
Servicios para procesar pagos y generar comprobantes.

| Método | Endpoint | Descripción | Cuerpo (Input) | Respuesta (Output) |
|---|---|---|---|---|
| GET | `/api/invoices` | Historial de facturas generadas. | N/A | `Array[Invoices]` |
| POST | `/api/invoices` | Genera factura y cierra un pedido. | `{orderId, method, clientName}` | `{newInvoice}` |

---

## Tecnologías de Implementación
- **Motor:** Node.js v18+
- **Framework:** Express.js
- **Formato de datos:** JSON
- **Persistencia:** File-based DB (data/*.json)
