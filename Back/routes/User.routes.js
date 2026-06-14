const { Router } = require('express');
const connection = require('../db');
const { verifyToken, createConfirmationToken } = require('../auth/auth');
const { sendConfirmationEmail } = require('../services/emailService');

const {
  nameValidation,
  loginValidation,
} = require('../auth/userValidation');

const router = new Router();

const checkEmailUnique = (req, res, next) => {
  const { email } = req.body;
  if (!email) return next();

  connection.query('SELECT * FROM usuarios WHERE email = ?', [email], function (err, results) {
    if (err) {
      return res.status(500).json({ message: 'Erro interno ao validar email.' });
    }
    if (results.length === 0) {
      return next();
    }

    const token = req.headers.authorization;
    if (token) {
      try {
        const { data } = verifyToken(token);
        if (results.length === 1 && results[0].email === data.email) {
          return next();
        }
      } catch {
        // ignore token error here; route handlers will handle invalid token
      }
    }

    return res.status(400).json({ message: 'Esse email já foi utilizado' });
  });
};

router.get('/', (req, res) => {
  try {
    const token = req.headers.authorization;
    const { data } = verifyToken(token);
    connection.query('SELECT id, nome, email, role FROM usuarios WHERE email = ?', [data.email], function (err, results) {
      if (err) {
        return res.status(400).json({ message: 'Erro ao buscar usuário.' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
      return res.status(200).json(results[0]);
    });
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

    connection.query(
      'UPDATE usuarios SET email_confirmed = 1 WHERE email = ?',
      [data.email],
      function (err, result) {
        if (err) {
          return res.status(500).json({ message: 'Erro ao confirmar e-mail.' });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Usuário não encontrado ou já confirmado.' });
        }

        return res.status(200).json({ message: 'E-mail confirmado com sucesso. Agora você pode fazer login.' });
      }
    );
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido ou expirado.' });
  }
});

router.post('/', loginValidation, nameValidation, checkEmailUnique, (req, res) => {
  const user = req.body;

  connection.query(
    'INSERT INTO usuarios (nome, email, password, role, email_confirmed) VALUES (?,?,?,?,?)',
    [user.name, user.email, user.password, 'user', 0],
    async function (err) {
      if (err) {
        return res.status(400).json({ message: 'Erro ao criar usuário.' });
      }

      const confirmationToken = createConfirmationToken({ email: user.email, action: 'confirm_email' });
      sendConfirmationEmail(user.email, confirmationToken)
        .then(() => {
          return res.status(201).json({ message: 'Usuário criado. Verifique seu e-mail para confirmar a conta.' });
        })
        .catch((sendError) => {
          console.error('Erro ao enviar e-mail de confirmação:', sendError.message || sendError);
          return res.status(201).json({
            message:
              'Usuário criado com sucesso, mas não foi possível enviar o e-mail de confirmação. Tente novamente mais tarde ou verifique suas configurações de SMTP.',
          });
        });
    }
  );
});

router.put('/', checkEmailUnique, (req, res) => {
  try {
    const token = req.headers.authorization;
    const { data } = verifyToken(token);
    const user = req.body;

    if (!user.name && !user.email && !user.password) {
      return res.status(400).json({ message: 'Nenhum campo para atualizar foi enviado.' });
    }

    const updates = [];
    const params = [];

    if (user.name) {
      updates.push('nome = ?');
      params.push(user.name);
    }
    if (user.email) {
      updates.push('email = ?');
      params.push(user.email);
      updates.push('email_confirmed = 0');
    }
    if (user.password) {
      updates.push('password = ?');
      params.push(user.password);
    }

    params.push(data.email);
    const query = `UPDATE usuarios SET ${updates.join(', ')} WHERE email = ?`;

    connection.query(query, params, function (err) {
      if (err) {
        return res.status(400).json({ message: 'Erro ao atualizar usuário.' });
      }

      connection.query('SELECT id, nome, email, role FROM usuarios WHERE email = ?', [user.email || data.email], function (selectErr, results) {
        if (selectErr) {
          return res.status(400).json({ message: 'Erro ao carregar usuário atualizado.' });
        }
        return res.status(200).json(results[0]);
      });
    });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
});

router.delete('/', (req, res) => {
  try {
    const token = req.headers.authorization;
    const { data } = verifyToken(token);

    connection.query('DELETE FROM usuarios WHERE email = ?', [data.email], function (err) {
      if (err) {
        return res.status(400).json({ message: 'Erro ao deletar conta.' });
      }
      return res.status(200).json({ message: 'Conta deletada com sucesso' });
    });
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

    const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
    if (!emailValidation) {
      return res.status(400).json({ message: 'Email inválido.' });
    }

    connection.query('SELECT id, email, email_confirmed, last_resend_at FROM usuarios WHERE email = ?', [email], async function (err, results) {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar usuário.' });
      }

      if (results.length === 0) {
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

      try {
        const confirmationToken = createConfirmationToken({ email: user.email, action: 'confirm_email' });
        await sendConfirmationEmail(user.email, confirmationToken);

        connection.query('UPDATE usuarios SET last_resend_at = NOW() WHERE id = ?', [user.id], (updateErr) => {
          if (updateErr) {
            console.error('Erro ao atualizar last_resend_at:', updateErr);
          }
        });

        return res.status(200).json({ message: 'Código de confirmação reenviado com sucesso. Verifique seu email.' });
      } catch (sendError) {
        console.error('Erro ao enviar e-mail de confirmação:', sendError.message || sendError);
        return res.status(500).json({ message: 'Erro ao enviar e-mail de confirmação. Tente novamente mais tarde.' });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

module.exports = router;