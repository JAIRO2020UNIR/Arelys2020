import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', label: '📊 Dashboard', end: true },
    { to: '/admin/menu', label: '🍽️ Gestión Menú' },
    { to: '/admin/pedidos', label: '📝 Pedidos' },
    { to: '/admin/reservas', label: '📅 Reservas' },
    { to: '/admin/inventarios', label: '📦 Inventario' },
    { to: '/admin/facturacion', label: '🧾 Facturación' },
    { to: '/admin/reportes', label: '📈 Reportes' },
    { to: '/admin/usuarios', label: '👥 Usuarios' },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-text" style={{fontSize: '1.4rem'}}>REST GOURMET</div>
          <p style={{color: '#777', fontSize: '0.65rem', fontWeight: 'bold', marginTop: '5px'}}>ADMIN PANEL</p>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink 
                  to={item.to} 
                  end={item.end}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{padding: '2rem', borderTop: '1px solid #333'}}>
          <button 
            onClick={handleLogout}
            style={{background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem'}}
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-top-bar">
          <h1 style={{fontSize: '1.2rem'}}>Panel de Gestión Integral</h1>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <span style={{fontSize: '0.9rem', color: '#666'}}>Bienvenido, <strong>Administrador</strong></span>
            <div style={{width: '35px', height: '35px', background: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontWeight: 'bold', fontSize: '0.8rem'}}>
              AD
            </div>
          </div>
        </header>

        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
