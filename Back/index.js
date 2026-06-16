require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { pool, query } = require('./db');
const { loginRoutes, userRoutes, commentRoutes } = require('./routes');
const { verifySmtpConnection } = require('./services/emailService');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/comments', commentRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Erro interno do servidor.' });
});

const ensureEmailConfirmedColumn = async () => {
  try {
    const emailResults = await query("SHOW COLUMNS FROM usuarios LIKE 'email_confirmed'");
    if (!emailResults.length) {
      await query('ALTER TABLE usuarios ADD COLUMN email_confirmed TINYINT(1) DEFAULT 0');
      console.log('Coluna email_confirmed criada com sucesso.');
    }

    const lastResendResults = await query("SHOW COLUMNS FROM usuarios LIKE 'last_resend_at'");
    if (!lastResendResults.length) {
      await query('ALTER TABLE usuarios ADD COLUMN last_resend_at DATETIME NULL');
      console.log('Coluna last_resend_at criada com sucesso.');
    }
  } catch (err) {
    console.error('Erro ao verificar colunas de usuários:', err.message);
  }
};

const startServer = async () => {
  const port = Number(process.env.PORT) || 3001;
  app.listen(port, async () => {
    console.log(`Backend rodando na porta ${port}`);
    try {
      await pool.query('SELECT 1');
      console.log('MySQL connection OK');
      await ensureEmailConfirmedColumn();

      try {
        await verifySmtpConnection();
        console.log('SMTP connection OK');
      } catch (smtpError) {
        console.error('Erro ao conectar no SMTP:', smtpError.message || smtpError);
      }
    } catch (err) {
      console.error('Erro ao conectar no MySQL:', err.message);
    }
  });
};

startServer();
