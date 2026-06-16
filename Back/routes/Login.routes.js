const { Router } = require('express');
const { query } = require('../db');
const { loginValidation } = require('../auth/userValidation');
const { createToken } = require('../auth/auth');

const router = new Router();
router.use(loginValidation);

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (!results.length) {
      console.log(`Falha de login: email não encontrado -> ${email}`);
      return res.status(401).json({ message: 'Email não cadastrado.' });
    }

    const user = results[0];
    if (user.password !== password) {
      console.log(`Falha de login: senha incorreta para email=${email}`);
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    if (user.email_confirmed !== 1) {
      console.log(`Falha de login: email não confirmado para email=${email}`);
      return res.status(401).json({ message: 'E-mail não confirmado. Verifique sua caixa de entrada.' });
    }

    const token = createToken({ id: user.id, email: user.email, nome: user.nome, role: user.role });
    return res.status(200).json({ id: user.id, nome: user.nome, email: user.email, role: user.role, token });
  } catch (err) {
    console.error(`Falha de login: ${err.message}`);
    return res.status(500).json({ message: 'Erro interno ao processar login. Tente novamente.' });
  }
});

module.exports = router;