require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { pool, query } = require('./db');
const { loginRoutes, userRoutes, commentRoutes } = require('./routes');
const { verifySmtpConnection } = require('./services/emailService');

const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://tranquil-souffle-73e0e4.netlify.app',
  'http://localhost:5173',
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API online' });
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({
      status: 'ok',
      database: 'connected',
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    });
  } catch (err) {
    console.error('Health check database error:', err);
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      error: err.message || err.code || 'Unknown database error',
    });
  }
});

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/comments', commentRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Erro interno do servidor.' });
});

const ensureEmailConfirmedColumn = async () => {
  try {
    const emailResults = await query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'usuarios' AND column_name = 'email_confirmed'"
    );
    if (!emailResults.length) {
      await query('ALTER TABLE usuarios ADD COLUMN email_confirmed SMALLINT DEFAULT 0');
      console.log('Coluna email_confirmed criada com sucesso.');
    }

    const lastResendResults = await query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'usuarios' AND column_name = 'last_resend_at'"
    );
    if (!lastResendResults.length) {
      await query('ALTER TABLE usuarios ADD COLUMN last_resend_at TIMESTAMP NULL');
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
      console.log('PostgreSQL connection OK');
      await ensureEmailConfirmedColumn();

      try {
        await verifySmtpConnection();
        console.log('SMTP connection OK');
      } catch (smtpError) {
        console.error('Erro ao conectar no SMTP:', smtpError.message || smtpError);
      }
    } catch (err) {
      console.error('Erro ao conectar no PostgreSQL:', err.message);
    }
  });
};

if (process.env.VERCEL) {
  ensureEmailConfirmedColumn();
} else {
  startServer();
}

module.exports = app;
