const { readData, writeData } = require('../utils/fileHandler');

const getMenu = (req, res) => {
  try {
    const menu = readData('menu.json');
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Error al leer el menú' });
  }
};

const addMenuItem = (req, res) => {
  try {
    const menu = readData('menu.json');
    const newItem = {
      id: Date.now(),
      ...req.body
    };
    menu.push(newItem);
    writeData('menu.json', menu);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el plato' });
  }
};

const updateMenuItem = (req, res) => {
  try {
    const { id } = req.params;
    const menu = readData('menu.json');
    const index = menu.findIndex(item => item.id == id);
    if (index !== -1) {
      menu[index] = { ...menu[index], ...req.body };
      writeData('menu.json', menu);
      res.json(menu[index]);
    } else {
      res.status(404).json({ message: 'Plato no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el plato' });
  }
};

const deleteMenuItem = (req, res) => {
  try {
    const { id } = req.params;
    const menu = readData('menu.json');
    const filteredMenu = menu.filter(item => item.id != id);
    writeData('menu.json', filteredMenu);
    res.json({ message: 'Plato eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el plato' });
  }
};

module.exports = { getMenu, addMenuItem, updateMenuItem, deleteMenuItem };
