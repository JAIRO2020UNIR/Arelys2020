/**
 * Servicio Web para Registro e Inicio de Sesión - Diseñado para pruebas en Postman
 * 
 * Este servicio implementa una API básica para:
 * 1. Registro de usuarios (POST /register)
 * 2. Autenticación de usuarios (POST /login)
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001; // Cambiamos a 3001 para evitar conflictos con el anterior
const USERS_FILE = path.join(__dirname, 'usuarios_postman.json');

// Habilitamos el procesamiento de JSON en las peticiones
app.use(express.json());

/**
 * Función para cargar los usuarios guardados
 */
const cargarUsuarios = () => {
    try {
        if (!fs.existsSync(USERS_FILE)) return [];
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch (e) {
        return [];
    }
};

/**
 * Función para guardar los usuarios en el archivo JSON
 */
const guardarUsuarios = (usuarios) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));
};

/**
 * ENDPOINT: REGISTRO DE USUARIOS
 * Recibe: { "usuario": "...", "password": "..." }
 */
app.post('/register', (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ error: "Faltan datos de usuario o contraseña" });
    }

    const usuarios = cargarUsuarios();
    if (usuarios.find(u => u.usuario === usuario)) {
        return res.status(400).json({ error: "El usuario ya existe" });
    }

    usuarios.push({ usuario, password });
    guardarUsuarios(usuarios);

    res.status(201).json({ message: "Usuario registrado con éxito" });
});

/**
 * ENDPOINT: INICIO DE SESIÓN (LOGIN)
 * Recibe: { "usuario": "...", "password": "..." }
 */
app.post('/login', (req, res) => {
    const { usuario, password } = req.body;
    const usuarios = cargarUsuarios();

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.password === password);

    if (usuarioEncontrado) {
        // Mensaje requerido según prompts.txt
        res.status(200).json({ message: "Autenticación satisfactoria" });
    } else {
        // Mensaje de error requerido según prompts.txt
        res.status(401).json({ error: "Error en la autenticación" });
    }
});

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`\nServidor Postman corriendo en http://localhost:${PORT}`);
});
