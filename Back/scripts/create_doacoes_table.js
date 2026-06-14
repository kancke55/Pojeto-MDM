const db = require('../db');

const sql = `CREATE TABLE IF NOT EXISTS doacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount INT NOT NULL,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL,
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

db.query(sql, (err) => {
  if (err) console.error('ERROR:', err.message);
  else console.log('Table doacoes ensured');
  process.exit(err ? 1 : 0);
});
