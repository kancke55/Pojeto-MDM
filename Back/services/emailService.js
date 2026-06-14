const nodemailer = require('nodemailer');

const {
  SMTP_SERVICE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_FROM,
  FRONTEND_URL,
} = process.env;

function createTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error('Configuração SMTP incompleta. Verifique SMTP_USER e SMTP_PASS.');
  }

  const transporterConfig = SMTP_SERVICE
    ? {
        service: SMTP_SERVICE,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      }
    : {
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      };

  return nodemailer.createTransport(transporterConfig);
}

async function sendConfirmationEmail(email, token) {
  const transporter = createTransporter();
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  const confirmUrl = `${backendUrl}/user/confirm/${encodeURIComponent(token)}`;

  const mailOptions = {
    from: EMAIL_FROM || SMTP_USER,
    to: email,
    subject: 'Confirme seu e-mail do Projeto MDM',
    html: `
      <p>Olá,</p>
      <p>Obrigado por se cadastrar no Projeto MDM. Para ativar sua conta, clique no link abaixo e confirme seu e-mail:</p>
      <p><a href="${confirmUrl}" target="_blank" rel="noopener noreferrer">Confirmar e-mail</a></p>
      <p>Se você não solicitou esse cadastro, ignore esta mensagem.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendConfirmationEmail,
};