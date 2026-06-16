const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'senha';

const JWT_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '60m',
};

const CONFIRMATION_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '24h',
};

const RESET_PASSWORD_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '1h',
};

const verifyToken = (token) => jwt.verify(token, secret);

const createToken = (payload) =>
  jwt.sign({ data: payload }, secret, JWT_CONFIG);

const createConfirmationToken = (payload) =>
  jwt.sign({ data: payload }, secret, CONFIRMATION_CONFIG);

const createResetToken = (payload) =>
  jwt.sign({ data: payload }, secret, RESET_PASSWORD_CONFIG);

module.exports = { verifyToken, createToken, createConfirmationToken, createResetToken };