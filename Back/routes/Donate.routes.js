const { Router } = require('express');
const Stripe = require('stripe');
const connection = require('../db');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY || '');
const router = new Router();

// POST /donate -> cria sessão de checkout e registra doação como pending
router.post('/', async (req, res) => {
  try {
    const { amount, email } = req.body; // amount em centavos ou em reais dependendo do frontend
    if (!amount || !email) return res.status(400).json({ message: 'Dados inválidos' });

    const amountInCents = Number(amount);
    if (isNaN(amountInCents) || amountInCents <= 0) return res.status(400).json({ message: 'Valor inválido' });

    // salvar doação como pending
    const doacao = {
      amount: amountInCents,
      email,
      status: 'pending',
      created_at: new Date(),
    };

    connection.query(
      'INSERT INTO doacoes (amount, email, status, created_at) VALUES (?,?,?,?)',
      [doacao.amount, doacao.email, doacao.status, doacao.created_at],
      async function (err, result) {
        if (err) {
          console.error('Erro ao salvar doação:', err.message);
          return res.status(500).json({ message: 'Erro ao registrar doação.' });
        }

        const donationId = result.insertId;

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'brl',
                product_data: {
                  name: 'Doação - Projeto MDM',
                },
                unit_amount: doacao.amount,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          customer_email: email,
          metadata: { donationId: String(donationId) },
          success_url: `${frontendUrl}/?donation=success`,
          cancel_url: `${frontendUrl}/?donation=cancel`,
        });

        // salvar session id
        connection.query('UPDATE doacoes SET stripe_session_id = ? WHERE id = ?', [session.id, donationId], (uErr) => {
          if (uErr) console.error('Erro ao atualizar session id:', uErr.message);
        });

        return res.json({ url: session.url });
      }
    );
  } catch (error) {
    console.error('Erro /donate:', error.message || error);
    return res.status(500).json({ message: 'Erro interno ao criar cobrança.' });
  }
});

// handler para webhook (exportado em module.exports.handleStripeWebhook)
async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Erro webhook signature:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const donationId = session.metadata && session.metadata.donationId ? Number(session.metadata.donationId) : null;
    if (donationId) {
      connection.query('UPDATE doacoes SET status = ?, stripe_payment_intent_id = ? WHERE id = ?', ['paid', session.payment_intent, donationId], (err) => {
        if (err) console.error('Erro ao atualizar doação:', err.message);
      });
    }
  } else if (event.type === 'checkout.session.expired') {
    const session = event.data.object;
    const donationId = session.metadata && session.metadata.donationId ? Number(session.metadata.donationId) : null;
    if (donationId) {
      connection.query('UPDATE doacoes SET status = ? WHERE id = ?', ['expired', donationId], (err) => {
        if (err) console.error('Erro ao atualizar doação expirado:', err.message);
      });
    }
  }

  res.json({ received: true });
}

module.exports = { router, handleStripeWebhook };
