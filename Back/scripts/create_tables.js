const db = require('../db');

const statements = [
  `CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    email_confirmed SMALLINT DEFAULT 0,
    last_resend_at TIMESTAMP NULL
  )`,
  `CREATE TABLE IF NOT EXISTS comentarios (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    evento_id VARCHAR(50) NOT NULL,
    texto TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS doacoes (
    id SERIAL PRIMARY KEY,
    amount INTEGER NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL,
    stripe_session_id VARCHAR(255),
    stripe_payment_intent_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
];

async function main() {
  try {
    for (const statement of statements) {
      await db.query(statement);
    }

    console.log('PostgreSQL tables ensured');
    process.exit(0);
  } catch (err) {
    console.error('ERROR:', {
      name: err.name,
      code: err.code,
      message: err.message,
      detail: err.detail,
    });
    process.exit(1);
  }
}

main();
