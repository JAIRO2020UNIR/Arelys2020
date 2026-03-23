import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Ventas Hoy', value: '$1.250.000', color: '#1976d2' },
    { label: 'Pedidos Activos', value: '14', color: '#ffa000' },
    { label: 'Alertas Stock', value: '3 ítems', color: '#d32f2f' }
  ];

  const modules = [
    { id: 'menu', label: 'Gestión del Menú', desc: 'Administra la carta, precios y disponibilidad de platos.', icon: '🍽️', path: '/admin/menu' },
    { id: 'pedidos', label: 'Gestión de Pedidos', desc: 'Toma de comandas, estados de cocina y entregas.', icon: '📝', path: '/admin/pedidos' },
    { id: 'reservas', label: 'Control de Reservas', desc: 'Calendario de mesas y disponibilidad de clientes.', icon: '📅', path: '/admin/reservas' },
    { id: 'facturacion', label: 'Facturación y Caja', desc: 'Generación de facturas y cierres de caja diarios.', icon: '🧾', path: '/admin/facturacion' },
    { id: 'inventarios', label: 'Inventarios / Stock', desc: 'Control de insumos, mermas y alertas de stock.', icon: '📦', path: '/admin/inventarios' },
    { id: 'usuarios', label: 'Roles y Usuarios', desc: 'Administración de personal y permisos del sistema.', icon: '👥', path: '/admin/usuarios' },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <section className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card" style={{borderLeft: `5px solid ${stat.color}`}}>
            <h3>{stat.label}</h3>
            <div className="value">{stat.value}</div>
          </div>
        ))}
      </section>

      {/* Module Grid */}
      <h2 style={{fontSize: '1.2rem', color: '#444', marginBottom: '1.5rem'}}>Módulos del Sistema</h2>
      <section className="module-grid">
        {modules.map((mod) => (
          <div 
            key={mod.id} 
            className="module-card"
            onClick={() => navigate(mod.path)} // ESTA ES LA LÍNEA CRÍTICA
          >
            <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>{mod.icon}</div>
            <h3>{mod.label}</h3>
            <p style={{color: '#777', fontSize: '0.85rem', lineHeight: '1.4'}}>{mod.desc}</p>
            <div style={{marginTop: '1.5rem', color: '#D4AF37', fontWeight: 'bold', fontSize: '0.8rem'}}>Abrir Módulo →</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
