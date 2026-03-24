import { Outlet, NavLink, useNavigate } from 'react-router-dom';

/**
 * Layout Administrativo con Control de Acceso por Rol
 */
const AdminLayout = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'Invitado';
  const userName = localStorage.getItem('userName') || 'Usuario';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Definición de ítems con restricciones por rol
  const allNavItems = [
    { to: '/admin', label: '📊 Dashboard', roles: ['Administrador', 'Chef', 'Mesero', 'Cajero'] },
    { to: '/admin/menu', label: '🍽️ Gestión Menú', roles: ['Administrador', 'Chef'] },
    { to: '/admin/pedidos', label: '📝 Pedidos', roles: ['Administrador', 'Chef', 'Mesero', 'Cajero'] },
    { to: '/admin/reservas', label: '📅 Reservas', roles: ['Administrador', 'Mesero'] },
    { to: '/admin/inventarios', label: '📦 Inventario', roles: ['Administrador', 'Chef'] },
    { to: '/admin/facturacion', label: '🧾 Facturación', roles: ['Administrador', 'Cajero'] },
    { to: '/admin/reportes', label: '📈 Reportes', roles: ['Administrador'] },
    { to: '/admin/usuarios', label: '👥 Usuarios', roles: ['Administrador'] },
  ];

  // Filtrar el menú según el rol del usuario actual
  const allowedItems = allNavItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-text" style={{fontSize: '1.4rem'}}>REST GOURMET</div>
          <p style={{color: '#D4AF37', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '5px'}}>{userRole.toUpperCase()}</p>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {allowedItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => isActive ? 'active' : ''} end={item.to === '/admin'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{padding: '2rem', borderTop: '1px solid #333'}}>
          <p style={{color: '#aaa', fontSize: '0.75rem', marginBottom: '1rem'}}>Sesión: {userName}</p>
          <button onClick={handleLogout} style={{background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem'}}>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-top-bar">
          <h1 style={{fontSize: '1.2rem'}}>Panel de {userRole}</h1>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <span style={{fontSize: '0.9rem', color: '#666'}}>Hola, <strong>{userName}</strong></span>
            <div style={{width: '35px', height: '35px', background: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontWeight: 'bold', fontSize: '0.8rem'}}>
              {userName.substring(0,2).toUpperCase()}
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
