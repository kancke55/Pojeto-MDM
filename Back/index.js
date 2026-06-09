require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connection = require('./db')
const { loginRoutes, userRoutes } = require('./routes');

const app = express();

app.use(cors())
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/user', userRoutes);

app.listen(3001, () => {
  console.log('Online');
  connection.query('SELECT 1', (err) => {
    if (err) {
      console.error('MySQL health check failed:', err.message);
      return;
    }
    console.log('MySQL connection OK');
  });
});
