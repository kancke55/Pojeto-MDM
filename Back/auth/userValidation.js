const loginValidation = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('Falha de login: email ou senha ausentes');
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

    if (!emailValidation) {
        console.log(`Falha de login: email inválido -> ${email}`);
        return res.status(400).json({ message: 'Email inválido.' });
    }
    if (password.length < 6 || password.length > 20) {
        console.log(`Falha de login: senha com tamanho inválido para email=${email}`);
        return res.status(400).json({ message: 'Senha deve ter entre 6 e 20 caracteres.' });
    }
    return next();
}

const nameValidation = async (req, res, next) => {
    const {name} = req.body;

    if(name.length < 3 || name.length > 30) {
        return res.status(400)
        .json({ message: '"name" deve conter no mínimo 3 caracteres no máximo 30 caracteres' });
    } else {
        return next()
    }
}

module.exports = {
    loginValidation,
    nameValidation
};