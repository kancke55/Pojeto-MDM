const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = process.env.DATABASE_URL || {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Lukinha1513',
  database: process.env.DB_DATABASE || 'Mdm',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    return;
  }
  console.log('MySQL connected successfully');
});

module.exports = connection;
