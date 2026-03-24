import { useAdminData } from '../../context/AdminContext';

const Reports = () => {
  const { invoices } = useAdminData();

  // Calcular el total de ventas sumando los montos de las facturas
  const totalSales = invoices.reduce((acc, inv) => acc + inv.amount, 0);

  return (
    <div>
      <div style={{marginBottom: '2rem'}}>
        <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Reportes Estadísticos</h2>
        <p style={{color: '#777', fontSize: '0.85rem'}}>Análisis de rendimiento y ventas del día.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem'}}>
        <div className="stat-card" style={{borderLeft: '5px solid #D4AF37', background: '#1A1A1A', color: 'white'}}>
          <h3 style={{color: '#aaa'}}>Ventas Totales (Hoy)</h3>
          <div className="value" style={{color: '#D4AF37', fontSize: '2.5rem'}}>${totalSales.toLocaleString()}</div>
          <p style={{fontSize: '0.8rem', marginTop: '10px', color: '#777'}}>Basado en {invoices.length} facturas emitidas.</p>
        </div>

        <div className="stat-card" style={{borderLeft: '5px solid #1976d2'}}>
          <h3>Ticket Promedio</h3>
          <div className="value">${invoices.length > 0 ? (totalSales / invoices.length).toLocaleString() : 0}</div>
          <p style={{fontSize: '0.8rem', marginTop: '10px', color: '#777'}}>Promedio de gasto por factura.</p>
        </div>
      </div>

      <h3 style={{marginBottom: '1.5rem'}}>Desglose de Ingresos por Factura</h3>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr><th>No. Factura</th><th>Cliente</th><th>Monto</th><th>Método</th><th style={{textAlign: 'right'}}>Fecha</th></tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td style={{fontWeight: 'bold'}}>{inv.id}</td>
                <td>{inv.clientName}</td>
                <td style={{fontWeight: 'bold', color: '#D4AF37'}}>${inv.amount.toLocaleString()}</td>
                <td>{inv.method}</td>
                <td style={{textAlign: 'right', color: '#777'}}>22/03/2026</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
