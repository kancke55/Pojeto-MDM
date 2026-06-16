const { Router } = require('express');
const { query } = require('../db');
const { verifyToken, createConfirmationToken, createResetToken } = require('../auth/auth');
const { sendConfirmationEmail, sendPasswordResetEmail } = require('../services/emailService');
const { nameValidation, loginValidation } = require('../auth/userValidation');

const router = new Router();

const isValidEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

const isValidPassword = (password) =>
  typeof password === 'string' && password.length >= 6 && password.length <= 20;

const checkEmailUnique = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next();

  try {
    const results = await query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (!results.length) return next();

    const token = req.headers.authorization;
    if (token) {
      try {
        const { data } = verifyToken(token);
        if (results.length === 1 && results[0].email === data.email) {
          return next();
        }
      } catch {
        // invalid token is ignored here
      }
    }

    return res.status(400).json({ message: 'Esse email já foi utilizado.' });
  } catch (error) {
    console.error('Erro ao validar email único:', error.message);
    return res.status(500).json({ message: 'Erro interno ao validar email.' });
  }
};

router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { data } = verifyToken(token);
    const results = await query('SELECT id, nome, email, role FROM usuarios WHERE email = ?', [data.email]);

    if (!results.length) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json(results[0]);
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
});

router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { data } = verifyToken(token);

    if (data.action !== 'confirm_email' || !data.email) {
      return res.status(400).json({ message: 'Token de confirmação inválido.' });
    }

    const result = await query('UPDATE usuarios SET email_confirmed = 1 WHERE email = ?', [data.email]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado ou já confirmado.' });
    }

    return res.status(200).json({ message: 'E-mail confirmado com sucesso. Agora você pode fazer login.' });
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido ou expirado.' });
  }
});

router.post('/', loginValidation, nameValidation, checkEmailUnique, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await query('INSERT INTO usuarios (nome, email, password, role, email_confirmed) VALUES (?,?,?,?,?)', [name, email, password, 'user', 0]);

    const confirmationToken = createConfirmationToken({ email, action: 'confirm_email' });

    try {
      await sendConfirmationEmail(email, confirmationToken);
      return res.status(201).json({ message: 'Usuário criado. Verifique seu e-mail para confirmar a conta.' });
    } catch (sendError) {
      console.error('Erro ao enviar e-mail de confirmação:', sendError.message || sendError);
      return res.status(201).json({
        message:
          'Usuário criado com sucesso, mas não foi possível enviar o e-mail de confirmação. Tente novamente mais tarde ou verifique suas configurações de SMTP.',
      });
    }
  } catch (error) {
    console.error('Erro ao criar usuário:', error.message);
    return res.status(400).json({ message: 'Erro ao criar usuário.' });
  }
});

router.put('/', checkEmailUnique, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { data } = verifyToken(token);
    const { name, email, password } = req.body;

    const updates = [];
    const params = [];

    if (name) {
      updates.push('nome = ?');
      params.push(name);
    }
    if (email) {
      updates.push('email = ?');
      params.push(email);
      updates.push('email_confirmed = 0');
    }
    if (password) {
      updates.push('password = ?');
      params.push(password);
    }

    if (!updates.length) {
      return res.status(400).json({ message: 'Nenhum campo para atualizar foi enviado.' });
    }

    params.push(data.email);
    const queryString = `UPDATE usuarios SET ${updates.join(', ')} WHERE email = ?`;
    await query(queryString, params);

    const emailToSelect = email || data.email;
    const updated = await query('SELECT id, nome, email, role FROM usuarios WHERE email = ?', [emailToSelect]);
    return res.status(200).json(updated[0]);
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { data } = verifyToken(token);

    await query('DELETE FROM usuarios WHERE email = ?', [data.email]);
    return res.status(200).json({ message: 'Conta deletada com sucesso.' });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
});

router.post('/resend-confirmation', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email é obrigatório.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Email inválido.' });
    }

    const results = await query('SELECT id, email, email_confirmed, last_resend_at FROM usuarios WHERE email = ?', [email]);
    if (!results.length) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const user = results[0];
    if (user.email_confirmed) {
      return res.status(400).json({ message: 'Este email já foi confirmado.' });
    }

    const now = Date.now();
    const lastResendTime = user.last_resend_at ? new Date(user.last_resend_at).getTime() : 0;
    const timeSinceLastResend = now - lastResendTime;
    const oneMinuteInMs = 60 * 1000;

    if (timeSinceLastResend < oneMinuteInMs) {
      const remainingSeconds = Math.ceil((oneMinuteInMs - timeSinceLastResend) / 1000);
      return res.status(429).json({
        message: `Aguarde ${remainingSeconds} segundos antes de solicitar um novo código.`,
        remainingSeconds,
      });
    }

    const confirmationToken = createConfirmationToken({ email: user.email, action: 'confirm_email' });
    await sendConfirmationEmail(user.email, confirmationToken);
    await query('UPDATE usuarios SET last_resend_at = NOW() WHERE id = ?', [user.id]);

    return res.status(200).json({ message: 'Código de confirmação reenviado com sucesso. Verifique seu email.' });
  } catch (error) {
    console.error('Erro ao reenviar confirmação:', error.message);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

router.post('/reset-password-request', async (req, res) => {
  try {
    const { email } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Email inválido.' });
    }

    const results = await query('SELECT id, email, email_confirmed FROM usuarios WHERE email = ?', [email]);
    if (!results.length) {
      return res.status(200).json({ message: 'Se existir uma conta com este email, você receberá as instruções.' });
    }

    if (!results[0].email_confirmed) {
      return res.status(200).json({ message: 'Este email ainda não foi confirmado. Confirme sua conta antes de recuperar a senha.' });
    }

    const user = results[0];
    const resetToken = createResetToken({ email: user.email, action: 'reset_password' });

    try {
      await sendPasswordResetEmail(user.email, resetToken);
    } catch (sendError) {
      console.error('Erro ao enviar e-mail de recuperação:', {
        message: sendError.message || sendError,
        responseCode: sendError.responseCode,
        rejected: sendError.rejected,
      });
      return res.status(500).json({ message: 'Erro ao enviar e-mail de recuperação. Tente novamente mais tarde.' });
    }

    return res.status(200).json({ message: 'Se existir uma conta com este email, você receberá as instruções.' });
  } catch (error) {
    console.error('Erro ao solicitar recuperação de senha:', error.message);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token de recuperação é obrigatório.' });
    }

    if (!newPassword || newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas devem ser iguais.' });
    }

    if (!isValidPassword(newPassword)) {
      return res.status(400).json({ message: 'Senha deve ter entre 6 e 20 caracteres.' });
    }

    const { data } = verifyToken(token);
    if (data.action !== 'reset_password' || !data.email) {
      return res.status(400).json({ message: 'Token de recuperação inválido.' });
    }

    const result = await query('UPDATE usuarios SET password = ? WHERE email = ? AND email_confirmed = 1', [newPassword, data.email]);
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Token inválido, expirado ou usuário não confirmado.' });
    }

    return res.status(200).json({ message: 'Senha alterada com sucesso.' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error.message);
    return res.status(400).json({ message: 'Token de recuperação inválido ou expirado.' });
  }
});

module.exports = router;
