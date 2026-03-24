const express = require('express');
const router = express.Router();
const { getReservations, createReservation, confirmReservation } = require('../controllers/reservationController');

router.get('/', getReservations);
router.post('/', createReservation);
router.patch('/:id/confirm', confirmReservation);

module.exports = router;
