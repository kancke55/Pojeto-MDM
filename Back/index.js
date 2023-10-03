require('dotenv').config()

const express = require('express')
const mysql = require('mysql2');
var cors = require('cors')

const { loginRoutes, userRoutes } = require('./routes');

const app = express();
const connection = mysql.createConnection(process.env.DATABASE_URL)

app.use(cors())
app.use(express.json());

app.listen(3001, () => {
    console.log('Online');
    const result = connection.query('SELECT 1');
    if (result) console.log('MySQL connection OK');
  });

app.use('/login', loginRoutes)

app.use('/user', userRoutes)
