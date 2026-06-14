require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connection = require('./db')
const { loginRoutes, userRoutes, commentRoutes, donateRoutes } = require('./routes');

const app = express();

app.use(cors())

// Stripe webhook must receive raw body for signature verification
app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), donateRoutes.handleStripeWebhook);

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/comments', commentRoutes);
app.use('/donate', donateRoutes.router);

const ensureEmailConfirmedColumn = () => {
  connection.query("SHOW COLUMNS FROM usuarios LIKE 'email_confirmed'", (err, results) => {
    if (err) {
      console.error('Erro ao verificar coluna email_confirmed:', err.message);
      return;
    }

    if (!results.length) {
      connection.query('ALTER TABLE usuarios ADD COLUMN email_confirmed TINYINT(1) DEFAULT 0', (alterErr) => {
        if (alterErr) {
          console.error('Erro ao criar coluna email_confirmed:', alterErr.message);
          return;
        }
        console.log('Coluna email_confirmed criada com sucesso.');
      });
    }
  });
};

app.listen(3001, () => {
  console.log('Online');
  connection.query('SELECT 1', (err) => {
    if (err) {
      console.error('MySQL health check failed:', err.message);
      return;
    }
    console.log('MySQL connection OK');
    ensureEmailConfirmedColumn();
  });
});
