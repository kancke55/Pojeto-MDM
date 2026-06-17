const { Pool } = require('pg');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;
let connectionString = databaseUrl;
let ssl;

if (databaseUrl?.includes('sslmode=require')) {
  const url = new URL(databaseUrl);
  url.searchParams.delete('sslmode');
  connectionString = url.toString();
  ssl = { rejectUnauthorized: false };
}

const pool = new Pool({
  connectionString,
  ssl,
});

function convertPlaceholders(sql) {
  let index = 1;
  return sql.replace(/\?/g, () => `$${index++}`);
}

async function query(sql, params = []) {
  const result = await pool.query(convertPlaceholders(sql), params);
  const rows = result.rows;
  rows.affectedRows = result.rowCount;
  return rows;
}

module.exports = {
  pool,
  query,
};
