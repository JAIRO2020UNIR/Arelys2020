import { useNavigate } from 'react-router-dom';

/**
 * Componente Dashboard
 * Muestra métricas clave y tarjetas de acceso a módulos, 
 * filtradas según el rol del usuario.
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'Invitado';

  // Métricas generales (Visibles para todos, pero con datos simulados)
  const stats = [
    { label: 'Ventas Hoy', value: '$1.250.000', color: '#1976d2', roles: ['Administrador', 'Cajero'] },
    { label: 'Pedidos Activos', value: '14', color: '#ffa000', roles: ['Administrador', 'Chef', 'Mesero', 'Cajero'] },
    { label: 'Alertas Stock', value: '3 ítems', color: '#d32f2f', roles: ['Administrador', 'Chef'] }
  ];

  // Configuración de Módulos con sus respectivos permisos de acceso
  const allModules = [
    { id: 'menu', label: 'Gestión del Menú', desc: 'Administra la carta, precios y disponibilidad.', icon: '🍽️', path: '/admin/menu', roles: ['Administrador', 'Chef'] },
    { id: 'pedidos', label: 'Gestión de Pedidos', desc: 'Toma de comandas y estados de cocina.', icon: '📝', path: '/admin/pedidos', roles: ['Administrador', 'Chef', 'Mesero', 'Cajero'] },
    { id: 'reservas', label: 'Control de Reservas', desc: 'Calendario de mesas y disponibilidad.', icon: '📅', path: '/admin/reservas', roles: ['Administrador', 'Mesero'] },
    { id: 'facturacion', label: 'Facturación y Caja', desc: 'Generación de facturas y cierres diarios.', icon: '🧾', path: '/admin/facturacion', roles: ['Administrador', 'Cajero'] },
    { id: 'inventarios', label: 'Inventarios / Stock', desc: 'Control de insumos y mermas.', icon: '📦', path: '/admin/inventarios', roles: ['Administrador', 'Chef'] },
    { id: 'usuarios', label: 'Roles y Usuarios', desc: 'Administración de personal y permisos.', icon: '👥', path: '/admin/usuarios', roles: ['Administrador'] },
    { id: 'reportes', label: 'Reportes Estadísticos', desc: 'Métricas financieras y rendimiento.', icon: '📈', path: '/admin/reportes', roles: ['Administrador'] }
  ];

  // FILTRADO DINÁMICO: Solo mostrar lo que el Rol tiene permitido
  const allowedStats = stats.filter(s => s.roles.includes(userRole));
  const allowedModules = allModules.filter(m => m.roles.includes(userRole));

  return (
    <div>
      {/* Sección de Métricas Filtradas */}
      <section className="stats-grid">
        {allowedStats.map((stat) => (
          <div key={stat.label} className="stat-card" style={{borderLeft: `5px solid ${stat.color}`}}>
            <h3>{stat.label}</h3>
            <div className="value">{stat.value}</div>
          </div>
        ))}
      </section>

      {/* Título de Sección */}
      <h2 style={{fontSize: '1.2rem', color: '#444', marginBottom: '1.5rem', marginTop: '2.5rem'}}>
        Módulos Disponibles para su Rol: {userRole}
      </h2>

      {/* Rejilla de Módulos Filtrada */}
      <section className="module-grid">
        {allowedModules.map((mod) => (
          <div 
            key={mod.id} 
            className="module-card"
            onClick={() => navigate(mod.path)}
          >
            <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>{mod.icon}</div>
            <h3>{mod.label}</h3>
            <p style={{color: '#777', fontSize: '0.85rem', lineHeight: '1.4'}}>{mod.desc}</p>
            <div style={{marginTop: '1.5rem', color: '#D4AF37', fontWeight: 'bold', fontSize: '0.8rem'}}>
              ENTRAR AL MÓDULO →
            </div>
          </div>
        ))}
      </section>

      {/* Mensaje si no hay módulos (Caso de seguridad) */}
      {allowedModules.length === 0 && (
        <div style={{textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '15px'}}>
          <p style={{color: '#777'}}>No tiene módulos asignados. Contacte al administrador.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
