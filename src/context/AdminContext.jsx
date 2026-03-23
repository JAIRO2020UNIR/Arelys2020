import { createContext, useState, useContext } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Lista central de usuarios con contraseñas para el acceso
  const [users, setUsers] = useState([
    { id: 1, name: 'Administrador Principal', email: 'admin@restgourmet.com', password: 'admin123', role: 'Administrador', status: 'Activo' },
    { id: 2, name: 'Juan Mesero', email: 'juan@restgourmet.com', password: '123', role: 'Mesero', status: 'Activo' },
  ]);

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Salmón en Salsa de Eneldo', category: 'Plato Fuerte', price: 32500 },
    { id: 2, name: 'Risotto de Hongos', category: 'Entrada / Fuerte', price: 28900 },
    { id: 3, name: 'Filete Mignon', category: 'Corte Premium', price: 45000 },
  ]);

  const [orders, setOrders] = useState([
    { id: 101, table: 'Mesa 4', items: ['Salmón en Salsa de Eneldo'], total: 32500, status: 'En Cocina', notes: 'Sin sal' },
  ]);

  const [invoices, setInvoices] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [inventory, setInventory] = useState([]);

  return (
    <AdminContext.Provider value={{ 
      users, setUsers,
      menuItems, setMenuItems, 
      orders, setOrders, 
      invoices, setInvoices,
      reservations, setReservations,
      inventory, setInventory
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminData = () => useContext(AdminContext);
