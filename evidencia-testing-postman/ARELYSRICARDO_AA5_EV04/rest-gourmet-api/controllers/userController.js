const { readData, writeData } = require('../utils/fileHandler');

const login = (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readData('users.json');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Simulación de token/sesión básica devolviendo el usuario sin password
      const { password, ...userWithoutPassword } = user;
      res.json({ message: 'Login exitoso', user: userWithoutPassword });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getUsers = (req, res) => {
  try {
    const users = readData('users.json');
    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
    res.json(usersWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

const addUser = (req, res) => {
  try {
    const users = readData('users.json');
    const newUser = { id: Date.now(), ...req.body, status: 'Activo' };
    users.push(newUser);
    writeData('users.json', users);
    const { password, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar usuario' });
  }
};

module.exports = { login, getUsers, addUser };
