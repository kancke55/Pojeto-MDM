const { Router } = require('express');
const connection = require('../db');
const { loginValidation } = require('../auth/userValidation');
const { createToken } = require('../auth/auth');
const router = new Router();

router.use((req, res, next) => {
  loginValidation(req, res, next);
});

router.post('/', (req, res) => {
  const user = req.body;
  connection.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [user.email],
    function (err, results) {
      if (err) {
        console.log(`Falha de login: erro de banco para email=${user.email} -> ${err.message}`);
        return res.status(500).json({ message: 'Erro interno ao processar login. Tente novamente.' });
      }
      if (!results || results.length === 0) {
        console.log(`Falha de login: email não encontrado -> ${user.email}`);
        return res.status(401).json({ message: 'Email não cadastrado.' });
      }

      const loggedUser = results[0];
      if (loggedUser.password !== user.password) {
        console.log(`Falha de login: senha incorreta para email=${user.email}`);
        return res.status(401).json({ message: 'Senha incorreta.' });
      }

      if (loggedUser.email_confirmed !== 1) {
        console.log(`Falha de login: email não confirmado para email=${user.email}`);
        return res.status(401).json({ message: 'E-mail não confirmado. Verifique sua caixa de entrada.' });
      }

      delete loggedUser.password;
      const token = createToken({ id: loggedUser.id, email: loggedUser.email, nome: loggedUser.nome, role: loggedUser.role });
      return res.status(200).json({ ...loggedUser, token });
    }
  );
});

module.exports = router;