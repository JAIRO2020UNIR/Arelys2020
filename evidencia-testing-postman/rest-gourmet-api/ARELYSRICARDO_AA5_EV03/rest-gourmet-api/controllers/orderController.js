const { readData, writeData } = require('../utils/fileHandler');

const getOrders = (req, res) => {
  try {
    const orders = readData('orders.json');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

const createOrder = (req, res) => {
  try {
    const orders = readData('orders.json');
    const newOrder = {
      id: Date.now(),
      status: 'En Cocina',
      ...req.body
    };
    orders.push(newOrder);
    writeData('orders.json', orders);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};

const updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const orders = readData('orders.json');
    const index = orders.findIndex(o => o.id == id);
    if (index !== -1) {
      orders[index].status = status;
      writeData('orders.json', orders);
      res.json(orders[index]);
    } else {
      res.status(404).json({ message: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};

module.exports = { getOrders, createOrder, updateOrderStatus };
