import { useState, useEffect } from 'react';
import { useAdminData } from '../../context/AdminContext';

const Billing = () => {
  const { orders, invoices, setInvoices, setOrders } = useAdminData();
  const userRole = localStorage.getItem('userRole');
  const [showForm, setShowForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ 
    orderId: '', table: '', amount: 0, method: 'Tarjeta',
    clientName: '', clientDoc: ''
  });

  // Filtrar pedidos que ya fueron entregados a la mesa
  const deliveriedOrders = orders.filter(o => o.status === 'Entregado');

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
      
      // Marcar el pedido como Finalizado/Pagado para que salga de la lista de pendientes
      setOrders(orders.map(o => o.id === parseInt(newInvoice.orderId) ? { ...o, status: 'Pagado' } : o));
      
      setShowForm(false);
      setNewInvoice({ orderId: '', table: '', amount: 0, method: 'Tarjeta', clientName: '', clientDoc: '' });
    }
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Facturación y Caja</h2>
          <p style={{color: '#777', fontSize: '0.85rem'}}>Rol Cajero: Solo se facturan pedidos marcados como "Entregado".</p>
        </div>
        {(userRole === 'Cajero' || userRole === 'Administrador') && (
          <button className="btn-gold" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cerrar' : 'Procesar Cobro'}
          </button>
        )}
      </div>

      {showForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #D4AF37'}}>
          <h3 style={{marginBottom: '1.5rem'}}>Generar Factura Final</h3>
          <form onSubmit={handleCreateInvoice} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
            <div className="form-group"><label>Seleccionar Pedido Entregado</label>
              <select value={newInvoice.orderId} onChange={(e) => setNewInvoice({...newInvoice, orderId: e.target.value})} required>
                <option value="">-- Ver Pedidos por Cobrar --</option>
                {deliveriedOrders.map(o => <option key={o.id} value={o.id}>{o.table} - Pedido #{o.id} (${o.total.toLocaleString()})</option>)}
              </select>
            </div>
            <div className="form-group"><label>Método de Pago</label>
              <select value={newInvoice.method} onChange={(e) => setNewInvoice({...newInvoice, method: e.target.value})}>
                <option>Efectivo</option><option>Tarjeta</option><option>Transferencia</option>
              </select>
            </div>
            <div className="form-group"><label>Cliente</label>
              <input type="text" placeholder="Nombre" value={newInvoice.clientName} onChange={(e) => setNewInvoice({...newInvoice, clientName: e.target.value})} required />
            </div>
            <div className="form-group"><label>Identificación</label>
              <input type="text" placeholder="Doc" value={newInvoice.clientDoc} onChange={(e) => setNewInvoice({...newInvoice, clientDoc: e.target.value})} required />
            </div>
            <button type="submit" className="btn-gold" style={{gridColumn: 'span 2'}}>REGISTRAR PAGO: ${newInvoice.amount.toLocaleString()}</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Factura</th><th>Cliente</th><th>Mesa</th><th>Total</th><th style={{textAlign: 'right'}}>Estado</th></tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td style={{fontWeight: 'bold'}}>#{inv.id}</td>
                <td>{inv.clientName}</td>
                <td>{inv.table}</td>
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
