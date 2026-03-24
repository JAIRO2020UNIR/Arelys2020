const { readData, writeData } = require('../utils/fileHandler');

const getReservations = (req, res) => {
  try {
    const reservations = readData('reservations.json');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
};

const createReservation = (req, res) => {
  try {
    const reservations = readData('reservations.json');
    const newRes = {
      id: Date.now(),
      status: 'PENDIENTE',
      ...req.body
    };
    reservations.push(newRes);
    writeData('reservations.json', reservations);
    res.status(201).json(newRes);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear reserva' });
  }
};

const confirmReservation = (req, res) => {
  try {
    const { id } = req.params;
    const reservations = readData('reservations.json');
    const index = reservations.findIndex(r => r.id == id);
    if (index !== -1) {
      reservations[index].status = 'CONFIRMADA';
      writeData('reservations.json', reservations);
      res.json(reservations[index]);
    } else {
      res.status(404).json({ message: 'Reserva no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al confirmar reserva' });
  }
};

module.exports = { getReservations, createReservation, confirmReservation };
