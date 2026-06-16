const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = process.env.DATABASE_URL
  ? mysql.createPool(process.env.DATABASE_URL)
  : mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Lukinha1513',
      database: process.env.DB_DATABASE || 'Mdm',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = {
  pool,
  query,
};
