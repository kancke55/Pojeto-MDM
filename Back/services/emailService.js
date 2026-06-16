const nodemailer = require('nodemailer');

const {
  SMTP_SERVICE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_FROM,
  EMAIL_REPLY_TO,
  FRONTEND_URL,
} = process.env;

let cachedTransporter;

function createTransporter() {
  const smtpPass = (SMTP_PASS || '').replace(/\s+/g, '');

  if (!SMTP_USER || !smtpPass) {
    throw new Error('Configuração SMTP incompleta. Verifique SMTP_USER e SMTP_PASS.');
  }

  if (cachedTransporter) {
    return cachedTransporter;
  }

  const transporterConfig = SMTP_SERVICE
    ? {
        service: SMTP_SERVICE,
        auth: {
          user: SMTP_USER,
          pass: smtpPass,
        },
      }
    : {
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: {
          user: SMTP_USER,
          pass: smtpPass,
        },
      };

  cachedTransporter = nodemailer.createTransport(transporterConfig);
  return cachedTransporter;
}

function getFromAddress() {
  return EMAIL_FROM || SMTP_USER;
}

function getReplyToAddress() {
  return EMAIL_REPLY_TO || SMTP_USER;
}

function buildMailOptions({ to, subject, html, text }) {
  return {
    from: getFromAddress(),
    to,
    replyTo: getReplyToAddress(),
    subject,
    text,
    html,
  };
}

async function sendMail(mailOptions) {
  const transporter = createTransporter();
  const info = await transporter.sendMail(mailOptions);

  if (info.rejected && info.rejected.length > 0) {
    throw new Error(`Email rejeitado para: ${info.rejected.join(', ')}`);
  }

  return info;
}

async function verifySmtpConnection() {
  const transporter = createTransporter();
  await transporter.verify();
}

async function sendConfirmationEmail(email, token) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  const confirmUrl = `${backendUrl}/user/confirm/${encodeURIComponent(token)}`;

  return sendMail(buildMailOptions({
    to: email,
    subject: 'Confirme seu e-mail do Projeto MDM',
    text: `Olá, obrigado por se cadastrar no Projeto MDM. Para ativar sua conta, acesse: ${confirmUrl}`,
    html: `
      <p>Olá,</p>
      <p>Obrigado por se cadastrar no Projeto MDM. Para ativar sua conta, clique no link abaixo e confirme seu e-mail:</p>
      <p><a href="${confirmUrl}" target="_blank" rel="noopener noreferrer">Confirmar e-mail</a></p>
      <p>Se você não solicitou esse cadastro, ignore esta mensagem.</p>
    `,
  }));
}

async function sendPasswordResetEmail(email, token) {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const resetUrl = `${frontendUrl}/reset-password?token=${encodeURIComponent(token)}`;

  return sendMail(buildMailOptions({
    to: email,
    subject: 'Recuperação de senha do Projeto MDM',
    text: `Olá, recebemos uma solicitação para redefinir a senha da sua conta no Projeto MDM. Acesse o link para redefinir: ${resetUrl}`,
    html: `
      <p>Olá,</p>
      <p>Recebemos uma solicitação para redefinir a senha da sua conta no Projeto MDM.</p>
      <p><a href="${resetUrl}" target="_blank" rel="noopener noreferrer">Redefinir senha</a></p>
      <p>Se você não solicitou essa alteração, ignore esta mensagem.</p>
      <p>Este link expira em 1 hora.</p>
    `,
  }));
}

module.exports = {
  sendConfirmationEmail,
  sendPasswordResetEmail,
  verifySmtpConnection,
};