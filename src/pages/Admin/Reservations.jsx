import { useState } from 'react';
import { useAdminData } from '../../context/AdminContext';

/**
 * Componente de Gestión de Reservas (Área Administrativa)
 * Permite confirmar reservas de la web y registrar nuevas de forma manual.
 */
const Reservations = () => {
  const { reservations, setReservations } = useAdminData();
  const [showForm, setShowForm] = useState(false);
  
  // Estado para el registro manual de reservas
  const [newRes, setNewRes] = useState({ client: '', clientDoc: '', clientPhone: '', date: '', time: '08:00', pax: '1 Persona' });

  // Horarios de 8:00 AM a 11:00 PM
  const timeSlots = [];
  for (let hour = 8; hour <= 23; hour++) {
    timeSlots.push(`${hour < 10 ? '0' + hour : hour}:00`);
  }

  /**
   * Registra una reserva manual en el sistema
   */
  const handleAddRes = (e) => {
    e.preventDefault();
    if (newRes.client && newRes.date) {
      setReservations([...reservations, { ...newRes, id: Date.now(), status: 'CONFIRMADA' }]);
      setShowForm(false);
      setNewRes({ client: '', clientDoc: '', clientPhone: '', date: '', time: '08:00', pax: '1 Persona' });
    }
  };

  /**
   * Cambia el estado de una reserva pendiente a confirmada
   * @param {number} id 
   */
  const handleConfirm = (id) => {
    setReservations(reservations.map(r => r.id === id ? { ...r, status: 'CONFIRMADA' } : r));
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div><h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Control de Reservas</h2><p style={{color: '#777', fontSize: '0.85rem'}}>Gestione las reservas recibidas desde la web.</p></div>
        <button className="btn-gold" onClick={() => setShowForm(!showForm)}>{showForm ? 'Cerrar' : 'Nueva Reserva Manual'}</button>
      </div>

      {showForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #D4AF37'}}>
          <form onSubmit={handleAddRes} style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem'}}>
            <div className="form-group"><label>Cliente</label><input type="text" value={newRes.client} onChange={(e) => setNewRes({...newRes, client: e.target.value})} required /></div>
            <div className="form-group"><label>Documento</label><input type="text" value={newRes.clientDoc} onChange={(e) => setNewRes({...newRes, clientDoc: e.target.value})} /></div>
            <div className="form-group"><label>Teléfono</label><input type="text" value={newRes.clientPhone} onChange={(e) => setNewRes({...newRes, clientPhone: e.target.value})} /></div>
            <div className="form-group"><label>Fecha</label><input type="date" value={newRes.date} onChange={(e) => setNewRes({...newRes, date: e.target.value})} required /></div>
            <div className="form-group"><label>Hora</label>
              <select value={newRes.time} onChange={(e) => setNewRes({...newRes, time: e.target.value})}>
                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Personas</label><select value={newRes.pax} onChange={(e) => setNewRes({...newRes, pax: e.target.value})}><option>1 Persona</option><option>2 Personas</option><option>4 Personas</option></select></div>
            <button type="submit" className="btn-gold" style={{gridColumn: 'span 3'}}>REGISTRAR RESERVA</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Cliente</th><th>Documento</th><th>Contacto</th><th>Fecha/Hora</th><th>Pax</th><th style={{textAlign: 'right'}}>Estado</th></tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td style={{fontWeight: 'bold'}}>{res.client}</td>
                <td style={{fontSize: '0.8rem', color: '#777'}}>{res.clientDoc || '-'}</td>
                <td style={{fontSize: '0.85rem'}}>{res.clientPhone || '-'}</td>
                <td>{res.date} <br/><small style={{color: '#D4AF37'}}>{res.time}</small></td>
                <td>{res.pax}</td>
                <td style={{textAlign: 'right'}}>
                  {res.status === 'PENDIENTE' ? (
                    <button onClick={() => handleConfirm(res.id)} style={{background: '#fff8e1', border: '1px solid #D4AF37', color: '#D4AF37', padding: '4px 10px', borderRadius: '5px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer'}}>CONFIRMAR</button>
                  ) : (
                    <span className="status-badge status-ok">{res.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
