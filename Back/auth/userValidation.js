const loginValidation = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: 'email ou senha inválidos' });
    }

    const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

    if(!emailValidation) {
        return res.status(400).json({ message: '"email" precisa ser um email válido' });
    }
    if(password.length < 6 || password.length > 20 ) {
        return res.status(400)
        .json({ message: '"password" deve conter no mínimo 6 caracteres e no máximo 20 caracteres' });
    }
    return next()
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