import { Outlet, Link } from 'react-router-dom';

const PublicLayout = () => {
  // ESTILOS DE RESPALDO DIRECTOS (CORREGIDOS)
  const headerStyle = {
    backgroundColor: '#1A1A1A',
    borderBottom: '2px solid #D4AF37',
    padding: '1rem 8%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // Corregido
    position: 'sticky',
    top: 0,
    zIndex: 9999,
    width: '100%',
    height: '80px',
  };

  const navListStyle = {
    display: 'flex',
    listStyle: 'none',
    gap: '2.5rem',
    alignItems: 'center',
    margin: 0,
    padding: 0
  };

  const linkStyle = {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  };

  return (
    <div>
      <header className="main-header" style={headerStyle}>
        <div className="logo-text" style={{color: '#D4AF37', fontSize: '1.8rem', fontWeight: '800', letterSpacing: '3px'}}>
          REST GOURMET
        </div>
        <nav>
          <ul style={navListStyle}>
            <li><Link to="/" style={linkStyle}>Inicio</Link></li>
            <li><a href="#menu" style={linkStyle}>Menú</a></li>
            <li><a href="#reservas" style={linkStyle}>Reservas</a></li>
            <li>
              <Link to="/login" style={{...linkStyle, border: '1px solid #D4AF37', padding: '8px 20px', borderRadius: '50px', color: '#D4AF37'}}>
                LOGIN
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer style={{backgroundColor: '#111111', color: '#777', padding: '4rem 10% 2rem', textAlign: 'center'}}>
        <div className="logo-text" style={{fontSize: '1.2rem', marginBottom: '1rem', color: '#FFFFFF'}}>REST GOURMET</div>
        <p>&copy; 2026 Todos los derechos reservados. | Bogotá, Colombia</p>
      </footer>
    </div>
  );
};

export default PublicLayout;
