import React, { useState } from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { Link } from 'react-router-dom'
import { requestPasswordReset } from '../../service/api'
import './recover.css';

export default function Recover() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await requestPasswordReset(email);
      setMessage(response.message || 'Instruções enviadas para o seu email.');
      setEmail('');
    } catch (error) {
      setMessage(error.message || 'Erro ao solicitar recuperação de senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='recover-page'>
        <Header/>
        <div id='recover-email'>
          <h1>Recuperar Senha</h1>
          <form id='form-recover' onSubmit={handleSubmit}>
            <p id='email-p'>Digite seu endereço de email:</p>
            <input type="email" value={email} placeholder="seu@email.com" required onChange={(e) => setEmail(e.target.value)} />
            <input type="submit" value={loading ? 'Enviando...' : 'Enviar Link de Recuperação'} disabled={loading} />
            {message ? <p id='recover-message'>{message}</p> : null}
            <Link id='recover-link' to='/login'>Voltar ao login</Link>
          </form>
        </div>
        <Footer />
    </div>
  )
}
