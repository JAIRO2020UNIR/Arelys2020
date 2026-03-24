const express = require('express');
const router = express.Router();
const { getInventory, addItem, updateStock } = require('../controllers/inventoryController');

router.get('/', getInventory);
router.post('/', addItem);
router.patch('/:id/stock', updateStock);

module.exports = router;
