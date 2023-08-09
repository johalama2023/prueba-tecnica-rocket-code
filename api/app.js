const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

// Configura la conexión con la base de datos MySQL en Amazon RDS
const db_config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}

// Crea una piscina de conexiones a la base de datos MySQL
const pool = mysql.createPool(db_config);

// Middleware para analizar el cuerpo de las peticiones como JSON
app.use(bodyParser.json());
app.use(cors());

// Ruta para guardar un usuario en la base de datos
app.post('/api/guardar_usuario', (req, res) => {
  const usuario = req.body;

  // Validar los datos del usuario antes de guardarlos
  if (
    !usuario.nombre ||
    !usuario.apellido_paterno ||
    !usuario.fecha_nacimiento ||
    !usuario.email ||
    !usuario.telefono
  ) {
    return res
      .status(400)
      .json({ mensaje: 'Faltan campos requeridos en la solicitud' });
  }

  console.log('Datos del usuario recibidos:', usuario);

  const query = `
    INSERT INTO users_test_john_lanza (Nombre, Segundo_Nombre, Apellido_Paterno, Apellido_Materno, Fecha_Nacimiento, Email, Telefono)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const data = [
    nombre = usuario.nombre,
    segundo_nombre = usuario.segundo_nombre,
    apellido_paterno = usuario.apellido_paterno,
    apellido_materno = usuario.apellido_materno,
    fecha_nacimiento = usuario.fecha_nacimiento,
    email = usuario.email,
    telefono = usuario.telefono
  ];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener una conexión: ', err);
      res.status(500).json({ mensaje: 'Error al guardar el usuario' });
    } else {
      connection.query(query, data, (err, result) => {
        connection.release(); // Importante liberar la conexión después de usarla
        if (err) {
          console.error('Error al guardar en la base de datos: ', err);
          res.status(500).json({ mensaje: 'Error al guardar el usuario' });
        } else {
          console.log('Usuario guardado correctamente');
          res.status(201).json({ mensaje: 'Usuario guardado correctamente' });
        }
      });
    }
  });
});

// Ruta para obtener todos los usuarios
app.get('/api/obtener_usuarios', (req, res) => {
  const query = `SELECT * FROM users_test_john_lanza`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener una conexión: ', err);
      res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
    } else {
      connection.query(query, (err, result) => {
        connection.release();
        if (err) {
          console.error('Error al consultar la base de datos: ', err);
          res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
        } else {
          console.log('Usuarios encontrados:', result);
          res.status(200).json(result);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

