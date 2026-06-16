const { Router } = require('express');
const { query } = require('../db');
const { verifyToken } = require('../auth/auth');

const router = new Router();

router.get('/:eventoId', async (req, res) => {
  const { eventoId } = req.params;

  try {
    const results = await query(
      `SELECT c.id, c.texto, c.created_at, u.nome
       FROM comentarios c
       JOIN usuarios u ON c.usuario_id = u.id
       WHERE c.evento_id = ?
       ORDER BY c.created_at DESC`,
      [eventoId]
    );
    return res.status(200).json(results);
  } catch (err) {
    console.error('Erro ao buscar comentários:', err.message);
    return res.status(500).json({ message: 'Erro ao buscar comentários.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não informado.' });
    }

    const { data } = verifyToken(token);
    const { eventoId, texto } = req.body;

    if (!eventoId || !texto) {
      return res.status(400).json({ message: 'Evento e comentário são obrigatórios.' });
    }

    await query('INSERT INTO comentarios (usuario_id, evento_id, texto) VALUES (?, ?, ?)', [data.id, eventoId, texto]);

    return res.status(201).json({ message: 'Comentário criado.' });
  } catch (error) {
    console.error('Erro ao salvar comentário:', error.message);
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
});

module.exports = router;
