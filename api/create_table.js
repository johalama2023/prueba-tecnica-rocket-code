// create_table.js

const mysql = require('mysql2');

// Datos de conexión a la BD
const dbConfig = {
  host: 'data-avimo.cgriqmyweq5c.us-east-2.rds.amazonaws.com',
  user: 'testing',
  password: 'Pruebas%ALI%2020',
  database: 'testing_ali_fullstack'
};

// Crear la conexión a la BD
const connection = mysql.createConnection(dbConfig);

// Consulta para crear la tabla "usuarios"
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users_test_john_lanza (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    segundo_nombre VARCHAR(100),
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    fecha_nacimiento DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL
  )
`;

connection.query(createTableQuery, (err) => {
  if (err) {
    console.error('Error al crear la tabla "usuarios":', err);
  } else {
    console.log('Tabla "users_test_john_lanza" creada exitosamente.');
  }

  connection.end();
});
