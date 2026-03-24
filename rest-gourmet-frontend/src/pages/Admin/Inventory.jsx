import { useState } from 'react';
import { useAdminData } from '../../context/AdminContext';

const Inventory = () => {
  const { inventory, setInventory } = useAdminData();
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: 'Kg', supplier: '' });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.quantity) {
      setInventory([...inventory, { ...newItem, id: Date.now(), minStock: 5, status: 'OK' }]);
      setShowForm(false);
      setNewItem({ name: '', quantity: '', unit: 'Kg', supplier: '' });
    }
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div><h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Gestión de Inventarios</h2><p style={{color: '#777', fontSize: '0.85rem'}}>Control de insumos y stock gourmet.</p></div>
        <button className="btn-gold" onClick={() => setShowForm(!showForm)}>{showForm ? 'Cerrar' : 'Registrar Insumo'}</button>
      </div>

      {showForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #D4AF37'}}>
          <form onSubmit={handleAddItem} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
            <div className="form-group"><label>Nombre del Insumo</label><input type="text" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} required /></div>
            <div className="form-group"><label>Cantidad</label><input type="number" value={newItem.quantity} onChange={(e) => setNewItem({...newItem, quantity: e.target.value})} required /></div>
            <div className="form-group"><label>Unidad</label><select value={newItem.unit} onChange={(e) => setNewItem({...newItem, unit: e.target.value})}><option>Kg</option><option>Lts</option><option>Und</option><option>Botellas</option></select></div>
            <div className="form-group"><label>Proveedor</label><input type="text" value={newItem.supplier} onChange={(e) => setNewItem({...newItem, supplier: e.target.value})} /></div>
            <button type="submit" className="btn-gold" style={{gridColumn: 'span 2'}}>ACTUALIZAR STOCK</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="admin-table">
          <thead><tr><th>Insumo</th><th>Existencia</th><th>Unidad</th><th>Proveedor</th><th style={{textAlign: 'right'}}>Estado</th></tr></thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td style={{fontWeight: 'bold'}}>{item.name}</td><td>{item.quantity}</td><td>{item.unit}</td><td>{item.supplier}</td>
                <td style={{textAlign: 'right'}}><span className={`status-badge status-ok`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
