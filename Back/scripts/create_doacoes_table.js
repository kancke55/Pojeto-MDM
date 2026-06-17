const db = require('../db');

const sql = `CREATE TABLE IF NOT EXISTS doacoes (
  id SERIAL PRIMARY KEY,
  amount INTEGER NOT NULL,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL,
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

async function main() {
  try {
    await db.query(sql);
    console.log('Table doacoes ensured');
    process.exit(0);
  } catch (err) {
    console.error('ERROR:', err.message);
    process.exit(1);
  }
}

main();
