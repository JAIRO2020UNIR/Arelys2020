import { useState } from 'react';
import { useAdminData } from '../../context/AdminContext';

const Orders = () => {
  const { menuItems, orders, setOrders } = useAdminData();
  const userRole = localStorage.getItem('userRole');
  const [showForm, setShowForm] = useState(false);
  const [newOrder, setNewOrder] = useState({ table: 'Mesa 1', items: [], notes: '' });

  // LÓGICA DE WORKFLOW
  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleToggleItem = (itemName) => {
    const isSelected = newOrder.items.includes(itemName);
    const updatedItems = isSelected 
      ? newOrder.items.filter(i => i !== itemName)
      : [...newOrder.items, itemName];
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (newOrder.items.length > 0) {
      const totalValue = newOrder.items.reduce((acc, name) => acc + (menuItems.find(m => m.name === name)?.price || 0), 0);
      setOrders([...orders, { ...newOrder, id: Math.floor(100 + Math.random() * 900), total: totalValue, status: 'En Cocina' }]);
      setShowForm(false);
      setNewOrder({ table: 'Mesa 1', items: [], notes: '' });
    }
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Panel de Comandas</h2>
          <p style={{color: '#777', fontSize: '0.85rem'}}>Workflow: Mesero (Crea) -> Chef (Prepara) -> Mesero (Entrega)</p>
        </div>
        {(userRole === 'Administrador' || userRole === 'Mesero') && (
          <button className="btn-gold" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cerrar' : 'Nueva Orden'}
          </button>
        )}
      </div>

      {showForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #D4AF37'}}>
          <h3 style={{marginBottom: '1.5rem'}}>Tomar Pedido (Rol: Mesero)</h3>
          <form onSubmit={handleAddOrder}>
            <div className="form-group"><label>Mesa</label>
              <select value={newOrder.table} onChange={(e) => setNewOrder({...newOrder, table: e.target.value})}>
                <option>Mesa 1</option><option>Mesa 2</option><option>Mesa 3</option>
              </select>
            </div>
            <div className="form-group"><label>Selección de Platos</label>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem'}}>
                {menuItems.map(m => (
                  <label key={m.id} style={{padding: '10px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', background: newOrder.items.includes(m.name) ? '#fff8e1' : '#fff'}}>
                    <input type="checkbox" checked={newOrder.items.includes(m.name)} onChange={() => handleToggleItem(m.name)} /> {m.name}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="btn-gold w-full">ENVIAR A COCINA</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Mesa</th><th>Platos</th><th>Estado Actual</th><th style={{textAlign: 'right'}}>Acción Requerida</th></tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{fontWeight: 'bold'}}>{order.table}</td>
                <td style={{fontSize: '0.8rem'}}>{order.items.join(', ')}</td>
                <td><span className={`status-badge ${order.status === 'Listo' ? 'status-ok' : 'status-alert'}`}>{order.status}</span></td>
                <td style={{textAlign: 'right'}}>
                  {/* ACCIONES POR ROL */}
                  {userRole === 'Chef' && order.status === 'En Cocina' && (
                    <button onClick={() => updateStatus(order.id, 'Listo')} style={{background: '#D4AF37', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}>MARCAR LISTO</button>
                  )}
                  {userRole === 'Mesero' && order.status === 'Listo' && (
                    <button onClick={() => updateStatus(order.id, 'Entregado')} style={{background: '#2e7d32', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}>ENTREGAR A MESA</button>
                  )}
                  {order.status === 'Entregado' && <span style={{color: '#777', fontSize: '0.8rem'}}>Esperando Factura</span>}
                  {(userRole === 'Cajero' || userRole === 'Administrador') && order.status === 'Entregado' && (
                    <span style={{color: '#1976d2', fontWeight: 'bold'}}>Ir a Facturación</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
