import { useState } from 'react';
import { useAdminData } from '../../context/AdminContext';

/**
 * Componente Home (Landing Page)
 * Gestiona la visualización de la carta y el formulario público de reservas.
 */
const Home = () => {
  const { menuItems, reservations, setReservations } = useAdminData();
  
  // Estado local para el formulario de reserva del cliente
  const [newRes, setNewRes] = useState({ 
    client: '', clientDoc: '', clientPhone: '', date: '', time: '08:00', pax: '1 Persona', notes: '' 
  });

  // Generación de horarios desde 8:00 AM hasta 11:00 PM
  const timeSlots = [];
  for (let hour = 8; hour <= 23; hour++) {
    const formattedHour = `${hour < 10 ? '0' + hour : hour}:00`;
    timeSlots.push(formattedHour);
  }

  /**
   * Maneja el envío de la reserva desde el portal público
   * @param {Event} e 
   */
  const handleClientRes = (e) => {
    e.preventDefault();
    if (newRes.client && newRes.date) {
      const resWithId = { ...newRes, id: Date.now(), status: 'PENDIENTE' };
      setReservations([...reservations, resWithId]);
      alert('¡Gracias! Su reserva ha sido enviada. El restaurante la confirmará pronto.');
      setNewRes({ client: '', clientDoc: '', clientPhone: '', date: '', time: '08:00', pax: '1 Persona', notes: '' });
    }
  };

  return (
    <div>
      {/* Sección Hero: Impacto Visual Inicial */}
      <section className="hero-container">
        <h1>Sabores que cautivan</h1>
        <p>Disfrute de la más alta cocina internacional en un ambiente diseñado para los sentidos.</p>
        <a href="#reservas" className="btn-gold">RESERVAR AHORA</a>
      </section>

      {/* Sección Menú: Visualización de Platos del Estado Global */}
      <section id="menu" className="section-padding">
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
          <h2 style={{fontSize: '2.5rem', textTransform: 'uppercase'}}>Nuestra Selección Gourmet</h2>
          <div style={{width: '60px', height: '3px', background: '#D4AF37', margin: '15px auto'}}></div>
        </div>

        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-card">
              <div className="card-img" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=600&q=80)` }}></div>
              <div className="card-info">
                <h3>{item.name}</h3>
                <div className="price-text">${item.price.toLocaleString()}</div>
                <button className="btn-gold" style={{background: 'none', border: '1px solid #1A1A1A', color: '#1A1A1A'}}>
                  Añadir al pedido
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Reservas: Formulario con Horario Ampliado */}
      <section id="reservas" className="reserva-section">
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
          <h2 style={{fontSize: '2.5rem', textTransform: 'uppercase'}}>Reserva Tu Mesa</h2>
          <div style={{width: '60px', height: '3px', background: '#D4AF37', margin: '15px auto'}}></div>
        </div>

        <div className="reserva-box">
          <form onSubmit={handleClientRes}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" placeholder="Su nombre" value={newRes.client} onChange={(e) => setNewRes({...newRes, client: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Documento de Identidad</label>
                <input type="text" placeholder="C.C. o Pasaporte" value={newRes.clientDoc} onChange={(e) => setNewRes({...newRes, clientDoc: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Número de Contacto</label>
                <input type="text" placeholder="Celular" value={newRes.clientPhone} onChange={(e) => setNewRes({...newRes, clientPhone: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Fecha</label>
                <input type="date" value={newRes.date} onChange={(e) => setNewRes({...newRes, date: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Hora de Reserva</label>
                <select value={newRes.time} onChange={(e) => setNewRes({...newRes, time: e.target.value})}>
                  {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Número de Personas</label>
                <select value={newRes.pax} onChange={(e) => setNewRes({...newRes, pax: e.target.value})}>
                  <option>1 Persona</option><option>2 Personas</option><option>4 Personas</option><option>Más de 4</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-gold w-full" style={{fontSize: '1.1rem', padding: '1.2rem'}}>CONFIRMAR MI RESERVA GOURMET</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
