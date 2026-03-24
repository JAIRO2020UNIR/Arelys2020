const { readData, writeData } = require('../utils/fileHandler');

const getInvoices = (req, res) => {
  try {
    const invoices = readData('invoices.json');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener facturas' });
  }
};

const createInvoice = (req, res) => {
  try {
    const invoices = readData('invoices.json');
    const orders = readData('orders.json');
    
    const { orderId, method, clientName, clientDoc } = req.body;
    const orderIndex = orders.findIndex(o => o.id == orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    const order = orders[orderIndex];
    const newInvoice = {
      id: `FAC-2026-0${invoices.length + 1}`,
      orderId,
      table: order.table,
      amount: order.total,
      method,
      clientName,
      clientDoc,
      status: 'Pagado',
      date: new Date().toISOString()
    };

    invoices.push(newInvoice);
    writeData('invoices.json', invoices);

    // Actualizar el pedido como Pagado
    orders[orderIndex].status = 'Pagado';
    writeData('orders.json', orders);

    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar el cobro' });
  }
};

module.exports = { getInvoices, createInvoice };
