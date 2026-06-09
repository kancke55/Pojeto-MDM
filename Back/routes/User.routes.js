const { Router } = require('express');
const connection = require('../db');

const { verifyToken } = require('../auth/auth');

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

router.post('/', loginValidation, nameValidation, checkEmailUnique, (req, res) => {
  const user = req.body;
  connection.query(
    'INSERT INTO usuarios (nome, email, password, role) VALUES (?,?,?,?)',
    [user.name, user.email, user.password, 'user'],
    function (err) {
      if (err) {
        return res.status(400).json({ message: 'Erro ao criar usuário.' });
      }
      return res.status(201).json({ message: 'Usuário criado com sucesso' });
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

module.exports = router;