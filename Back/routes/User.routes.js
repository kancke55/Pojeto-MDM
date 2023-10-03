const { Router } = require('express');
const mysql = require('mysql2');
const connection = mysql.createConnection(process.env.DATABASE_URL);

const {verifyToken} = require('../auth/auth')

const {
    nameValidation,
    loginValidation,
} = require('../auth/userValidation')

const router = new Router();


router.get('/', (req, res) => {
    try {
        const token = req.headers.authorization;
        verifyToken(token);
        connection.query('Select * from usuarios', function (err, results) {
            if (err) {
                return res.sendStatus(400);
            } return res.send(200, results);
        })
    } catch (error) {
        return res.sendStatus(401);
    }

})

router.use((req, res, next) => {
    const user = req.body;
    return connection.query('SELECT * FROM usuarios WHERE email = ?',[user.email], function(err, results) {
        if(err) {
            return console.log(err.message)
        }
        if(results.length > 0)
        {
            return res.status(400).json({ message: 'Esse email já foi utilizado' });
        } return next();
        })

})

router.post('/', loginValidation, nameValidation, (req, res) => {
    const user = req.body;
    connection.query('INSERT INTO usuarios (nome, email, password, role) VALUES (?,?,?,?)', [user.name, user.email, user.password, 'user'], function (err, results) {
        if(err) {
            return res.sendStatus(400);
        }
        return res.status(201);
    })
})

module.exports = router;