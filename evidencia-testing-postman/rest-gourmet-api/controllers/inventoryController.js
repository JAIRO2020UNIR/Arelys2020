const { readData, writeData } = require('../utils/fileHandler');

const getInventory = (req, res) => {
  try {
    const inventory = readData('inventory.json');
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener inventario' });
  }
};

const addItem = (req, res) => {
  try {
    const inventory = readData('inventory.json');
    const newItem = {
      id: Date.now(),
      status: 'OK',
      minStock: 5,
      ...req.body
    };
    inventory.push(newItem);
    writeData('inventory.json', inventory);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar insumo' });
  }
};

const updateStock = (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const inventory = readData('inventory.json');
    const index = inventory.findIndex(i => i.id == id);
    if (index !== -1) {
      inventory[index].quantity = quantity;
      writeData('inventory.json', inventory);
      res.json(inventory[index]);
    } else {
      res.status(404).json({ message: 'Insumo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar stock' });
  }
};

module.exports = { getInventory, addItem, updateStock };
