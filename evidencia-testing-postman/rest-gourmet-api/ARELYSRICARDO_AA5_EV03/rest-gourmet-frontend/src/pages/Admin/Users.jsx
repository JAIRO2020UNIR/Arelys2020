import { useState } from 'react';
import { useAdminData } from '../../context/AdminContext';

const Users = () => {
  const { users, setUsers } = useAdminData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [userData, setUserData] = useState({ name: '', email: '', password: '', role: 'Mesero' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Editar existente
      setUsers(users.map(u => u.id === editingId ? { ...userData, id: editingId, status: 'Activo' } : u));
    } else {
      // Crear nuevo
      setUsers([...users, { ...userData, id: Date.now(), status: 'Activo' }]);
    }
    handleCancel();
  };

  const handleEdit = (user) => {
    setUserData({ name: user.name, email: user.email, password: user.password, role: user.role });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setUserData({ name: '', email: '', password: '', role: 'Mesero' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Roles y Usuarios</h2>
          <p style={{color: '#777', fontSize: '0.85rem'}}>Gestiona el personal y sus credenciales de acceso.</p>
        </div>
        <button className="btn-gold" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Crear Nuevo Usuario'}
        </button>
      </div>

      {showForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #D4AF37'}}>
          <h3 style={{marginBottom: '1.5rem'}}>{editingId ? 'Editar Credenciales' : 'Registrar Nuevo Empleado'}</h3>
          <form onSubmit={handleSubmit} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Correo Electrónico (Login)</label>
              <input type="email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Rol de Acceso</label>
              <select value={userData.role} onChange={(e) => setUserData({...userData, role: e.target.value})}>
                <option>Administrador</option><option>Mesero</option><option>Chef</option><option>Cajero</option>
              </select>
            </div>
            <div className="form-group">
              <label>Contraseña de Acceso</label>
              <input type="text" placeholder="Asigne una contraseña" value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})} required />
            </div>
            <button type="submit" className="btn-gold" style={{gridColumn: 'span 2'}}>
              {editingId ? 'GUARDAR CAMBIOS' : 'CREAR CUENTA DE ACCESO'}
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Nombre</th><th>Correo</th><th>Contraseña</th><th>Rol</th><th style={{textAlign: 'right'}}>Acciones</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{fontWeight: 'bold'}}>{u.name}</td>
                <td>{u.email}</td>
                <td style={{fontFamily: 'monospace', color: '#777'}}>{u.password}</td>
                <td style={{color: '#D4AF37', fontWeight: 'bold'}}>{u.role}</td>
                <td style={{textAlign: 'right'}}>
                  <button onClick={() => handleEdit(u)} style={{background: '#f0f0f0', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer'}}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
