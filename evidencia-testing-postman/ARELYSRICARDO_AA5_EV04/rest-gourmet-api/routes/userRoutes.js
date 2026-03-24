const express = require('express');
const router = express.Router();
const { login, getUsers, addUser } = require('../controllers/userController');

router.post('/login', login);
router.get('/', getUsers);
router.post('/', addUser);

module.exports = router;
