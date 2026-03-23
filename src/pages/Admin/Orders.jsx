import { useState } from 'react';
import { useAdminData } from '../../context/AdminContext';

const Orders = () => {
  const { menuItems, orders, setOrders } = useAdminData();
  const [showForm, setShowForm] = useState(false);
  const [newOrder, setNewOrder] = useState({ 
    table: 'Mesa 1', 
    items: [], 
    notes: '' 
  });

  // Calcular el total sumando el precio de cada plato seleccionado
  const calculateTotal = (selectedItems) => {
    return selectedItems.reduce((acc, itemName) => {
      const dish = menuItems.find(m => m.name === itemName);
      return acc + (dish ? dish.price : 0);
    }, 0);
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
      const totalValue = calculateTotal(newOrder.items);
      const orderWithId = { 
        ...newOrder, 
        id: Math.floor(100 + Math.random() * 900), // ID de 3 dígitos
        total: totalValue, 
        status: 'En Cocina' 
      };
      setOrders([...orders, orderWithId]);
      setShowForm(false);
      setNewOrder({ table: 'Mesa 1', items: [], notes: '' });
    }
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Gestión de Pedidos</h2>
          <p style={{color: '#777', fontSize: '0.85rem'}}>Selecciona platos del menú y envía comandas a cocina.</p>
        </div>
        <button className="btn-gold" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cerrar' : 'Nueva Comanda'}
        </button>
      </div>

      {showForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #D4AF37'}}>
          <h3 style={{marginBottom: '1.5rem'}}>Registrar Comanda</h3>
          <form onSubmit={handleAddOrder}>
            <div className="form-group">
              <label>Seleccionar Mesa</label>
              <select value={newOrder.table} onChange={(e) => setNewOrder({...newOrder, table: e.target.value})}>
                <option>Mesa 1</option><option>Mesa 2</option><option>Mesa 3</option><option>Mesa 4</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{marginBottom: '1rem', display: 'block'}}>Platos del Menú (Selecciona uno o varios)</label>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem'}}>
                {menuItems.map((item) => (
                  <label key={item.id} style={{
                    padding: '10px', 
                    border: '1px solid #ddd', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    background: newOrder.items.includes(item.name) ? '#fff8e1' : '#fff',
                    borderColor: newOrder.items.includes(item.name) ? '#D4AF37' : '#ddd'
                  }}>
                    <input 
                      type="checkbox" 
                      style={{marginRight: '10px'}}
                      checked={newOrder.items.includes(item.name)}
                      onChange={() => handleToggleItem(item.name)}
                    />
                    <span style={{fontSize: '0.85rem'}}>{item.name}</span>
                    <div style={{fontSize: '0.75rem', color: '#D4AF37', fontWeight: 'bold'}}>${item.price.toLocaleString()}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Notas de la Orden (Detalle especial)</label>
              <textarea 
                rows="2" 
                placeholder="Ej: Sin cebolla, término medio, traer cubiertos extra..."
                value={newOrder.notes}
                onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
              ></textarea>
            </div>

            <div style={{background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontWeight: 'bold'}}>TOTAL ESTIMADO:</span>
              <span style={{fontSize: '1.5rem', fontWeight: '800', color: '#1A1A1A'}}>${calculateTotal(newOrder.items).toLocaleString()}</span>
            </div>

            <button type="submit" className="btn-gold w-full">ENVIAR PEDIDO A COCINA</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mesa</th>
              <th>Platos</th>
              <th>Notas</th>
              <th style={{textAlign: 'right'}}>Total Pedido</th>
              <th style={{textAlign: 'right'}}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{fontWeight: 'bold'}}>#{order.id}</td>
                <td>{order.table}</td>
                <td style={{fontSize: '0.85rem', color: '#333'}}>
                  {order.items.map((item, i) => <div key={i}>• {item}</div>)}
                </td>
                <td style={{fontSize: '0.8rem', fontStyle: 'italic', color: '#777'}}>{order.notes || '-'}</td>
                <td style={{textAlign: 'right', fontWeight: '800', color: '#D4AF37'}}>${order.total.toLocaleString()}</td>
                <td style={{textAlign: 'right'}}>
                  <span className={`status-badge ${order.status === 'Listo' ? 'status-ok' : 'status-alert'}`}>
                    {order.status}
                  </span>
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
