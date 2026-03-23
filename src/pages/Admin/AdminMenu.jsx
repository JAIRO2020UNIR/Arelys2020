import { useState } from 'react';
import { useAdminData } from '../../context/AdminContext';

const AdminMenu = () => {
  const { menuItems, setMenuItems } = useAdminData();
  const [showForm, setShowForm] = useState(false);
  const [newDish, setNewDish] = useState({ name: '', category: 'Plato Fuerte', price: '' });

  const handleAddDish = (e) => {
    e.preventDefault();
    if (newDish.name && newDish.price) {
      const priceNumeric = parseInt(newDish.price.replace(/[^0-9]/g, ''));
      const dishWithId = { 
        ...newDish, 
        id: Date.now(), 
        price: priceNumeric 
      };
      setMenuItems([...menuItems, dishWithId]); // USAR ESTADO GLOBAL
      setNewDish({ name: '', category: 'Plato Fuerte', price: '' });
      setShowForm(false);
    }
  };

  const handleDelete = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Gestión de la Carta</h2>
          <p style={{color: '#777', fontSize: '0.85rem'}}>Nuevos platos aparecerán automáticamente en el módulo de pedidos.</p>
        </div>
        <button className="btn-gold" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cerrar' : 'Agregar Nuevo Plato'}
        </button>
      </div>

      {showForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #D4AF37'}}>
          <h3 style={{marginBottom: '1.5rem'}}>Registrar Nuevo Plato</h3>
          <form onSubmit={handleAddDish} style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end'}}>
            <div className="form-group" style={{marginBottom: 0}}>
              <label>Nombre del Plato</label>
              <input type="text" placeholder="Ej: Pasta Carbonara" value={newDish.name} onChange={(e) => setNewDish({...newDish, name: e.target.value})} required />
            </div>
            <div className="form-group" style={{marginBottom: 0}}>
              <label>Categoría</label>
              <select value={newDish.category} onChange={(e) => setNewDish({...newDish, category: e.target.value})}>
                <option>Entrada</option><option>Plato Fuerte</option><option>Postre</option><option>Bebida</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom: 0}}>
              <label>Precio (Ej: 25000)</label>
              <input type="number" placeholder="25000" value={newDish.price} onChange={(e) => setNewDish({...newDish, price: e.target.value})} required />
            </div>
            <button type="submit" className="btn-gold">GUARDAR Y PUBLICAR</button>
          </form>
        </div>
      )}

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem'}}>
        {menuItems.map((item) => (
          <div key={item.id} style={{background: 'white', padding: '2rem', borderRadius: '15px', borderTop: '5px solid #D4AF37', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
            <span style={{fontSize: '0.7rem', background: '#f0f0f0', padding: '3px 10px', borderRadius: '10px', fontWeight: 'bold', color: '#666'}}>{item.category}</span>
            <h3 style={{margin: '1rem 0 0.5rem', fontSize: '1.2rem'}}>{item.name}</h3>
            <div style={{color: '#D4AF37', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '1.5rem'}}>${item.price.toLocaleString()}</div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button style={{flex: 1, padding: '8px', background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer'}}>Editar</button>
              <button onClick={() => handleDelete(item.id)} style={{flex: 1, padding: '8px', background: '#fff1f0', border: '1px solid #ffa39e', color: '#cf1322', borderRadius: '5px', cursor: 'pointer'}}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
