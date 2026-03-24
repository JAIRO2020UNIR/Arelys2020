import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminData } from '../../context/AdminContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { users } = useAdminData(); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Buscar si existe un usuario con ese email y contraseña
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', foundUser.name);
      localStorage.setItem('userRole', foundUser.role);
      navigate('/admin');
    } else {
      alert('Error: Credenciales no válidas.\nVerifique su correo y contraseña en el módulo de Usuarios.');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <header>
          <div className="logo-text" style={{color: '#1A1A1A', marginBottom: '0.5rem'}}>REST GOURMET</div>
          <p style={{color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Acceso Multi-Usuario</p>
        </header>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label style={{color: '#1A1A1A', fontSize: '0.85rem'}}>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="admin@restgourmet.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label style={{color: '#1A1A1A', fontSize: '0.85rem'}}>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', marginBottom: '1.5rem', color: '#555'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
              <input type="checkbox" /> Recordarme
            </label>
            <a href="#" style={{color: '#1A1A1A', textDecoration: 'none'}}>¿Olvidó su contraseña?</a>
          </div>

          <button type="submit" className="btn-gold w-full">ACCEDER AL PANEL</button>
        </form>

        <div className="login-footer-link">
          <Link to="/">Volver a la página principal</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
