const { Router } = require('express');
const mysql = require('mysql2');
const connection = mysql.createConnection(process.env.DATABASE_URL);
const {loginValidation} = require('../auth/userValidation')
const {createToken} = require('../auth/auth')
const router = new Router();
const axios = require('axios').default;



const test = (token) => {
    var request = require('request');
    const headers = {
        Authorization: token,
      };
      
    const parametros = {
        url: 'http://localhost:3001/user',
        headers,
    };
    
    request.get(parametros);
}

router.use((req, res, next) => {
    loginValidation(req, res, next);
})

router.post('/', (req, res) => {
    const user = req.body;
    connection.query('select * from usuarios where email = ? and password = ?', [user.email, user.password], function (err, results) {
            if(err) {
                    return res.sendStatus(400);
                }
                delete results[0].password;
                const token = createToken(user)
                test(token);
                return res.send(200, {...results[0], token});
            }) 
})

module.exports = router;