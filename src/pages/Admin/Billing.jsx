import { useState, useEffect } from 'react';
import { useAdminData } from '../../context/AdminContext';

const Billing = () => {
  const { orders, invoices, setInvoices } = useAdminData();
  const [showForm, setShowForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ 
    orderId: '', table: '', amount: 0, method: 'Tarjeta',
    clientName: '', clientDoc: '', clientPhone: '', clientEmail: ''
  });

  useEffect(() => {
    if (newInvoice.orderId) {
      const selectedOrder = orders.find(o => o.id === parseInt(newInvoice.orderId));
      if (selectedOrder) {
        setNewInvoice(prev => ({ ...prev, table: selectedOrder.table, amount: selectedOrder.total }));
      }
    }
  }, [newInvoice.orderId, orders]);

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    if (newInvoice.orderId && newInvoice.clientName) {
      const invoiceWithId = { ...newInvoice, id: `FAC-2026-0${invoices.length + 1}`, status: 'Pagado' };
      setInvoices([...invoices, invoiceWithId]);
      setShowForm(false);
      setNewInvoice({ orderId: '', table: '', amount: 0, method: 'Tarjeta', clientName: '', clientDoc: '', clientPhone: '', clientEmail: '' });
    }
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Facturación Electrónica</h2>
          <p style={{color: '#777', fontSize: '0.85rem'}}>Genera facturas legales con datos de cliente.</p>
        </div>
        <button className="btn-gold" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cerrar' : 'Nueva Factura'}
        </button>
      </div>

      {showForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #D4AF37'}}>
          <h3 style={{marginBottom: '1.5rem'}}>Información de Facturación</h3>
          <form onSubmit={handleCreateInvoice} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
            <div className="form-group"><label>Pedido</label>
              <select value={newInvoice.orderId} onChange={(e) => setNewInvoice({...newInvoice, orderId: e.target.value})} required>
                <option value="">-- Seleccione Pedido --</option>
                {orders.map(o => <option key={o.id} value={o.id}>Pedido #{o.id} - {o.table} (${o.total.toLocaleString()})</option>)}
              </select>
            </div>
            <div className="form-group"><label>Método de Pago</label>
              <select value={newInvoice.method} onChange={(e) => setNewInvoice({...newInvoice, method: e.target.value})}>
                <option>Efectivo</option><option>Tarjeta</option><option>Transferencia</option>
              </select>
            </div>
            <div className="form-group"><label>Nombre del Cliente</label>
              <input type="text" placeholder="Nombre completo" value={newInvoice.clientName} onChange={(e) => setNewInvoice({...newInvoice, clientName: e.target.value})} required />
            </div>
            <div className="form-group"><label>Documento / NIT</label>
              <input type="text" placeholder="C.C. o NIT" value={newInvoice.clientDoc} onChange={(e) => setNewInvoice({...newInvoice, clientDoc: e.target.value})} required />
            </div>
            <div className="form-group"><label>Teléfono de Contacto</label>
              <input type="text" placeholder="Celular" value={newInvoice.clientPhone} onChange={(e) => setNewInvoice({...newInvoice, clientPhone: e.target.value})} />
            </div>
            <div className="form-group"><label>Correo Electrónico</label>
              <input type="email" placeholder="cliente@email.com" value={newInvoice.clientEmail} onChange={(e) => setNewInvoice({...newInvoice, clientEmail: e.target.value})} />
            </div>
            <button type="submit" className="btn-gold" style={{gridColumn: 'span 2'}}>EMITIR FACTURA: ${newInvoice.amount.toLocaleString()}</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr><th>No. Factura</th><th>Cliente</th><th>Doc</th><th>Pedido</th><th>Total</th><th style={{textAlign: 'right'}}>Estado</th></tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td style={{fontWeight: 'bold'}}>#{inv.id}</td>
                <td>{inv.clientName}</td>
                <td style={{fontSize: '0.8rem', color: '#777'}}>{inv.clientDoc}</td>
                <td>Pedido #{inv.orderId}</td>
                <td style={{fontWeight: 'bold', color: '#D4AF37'}}>${inv.amount.toLocaleString()}</td>
                <td style={{textAlign: 'right'}}><span className="status-badge status-ok">{inv.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;
