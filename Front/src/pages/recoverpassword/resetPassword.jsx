import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { resetPassword } from '../../service/api'
import './recover.css'

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage('Link de recuperação inválido.');
      setMessageType('error');
      return;
    }

    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
      setMessage('As senhas devem ser iguais e não podem ficar vazias.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('success');

    try {
      const response = await resetPassword(token, newPassword, confirmPassword);
      setMessage(`${response.message || 'Senha alterada com sucesso.'} Você será redirecionado para o login em 5 segundos.`);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => navigate('/login'), 5000);
    } catch (error) {
      setMessage(error.message || 'Erro ao redefinir senha.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div id='recover-page'>
        <Header />
        <div id='reset-password'>
          <h1>Redefinir Senha</h1>
          <p id='reset-message' className='error'>Link de recuperação inválido ou expirado.</p>
          <Link id='reset-link' to='/login'>Voltar ao login</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div id='recover-page'>
      <Header />
      <div id='reset-password'>
        <h1>Redefinir Senha</h1>
        <form id='form-reset' onSubmit={handleSubmit}>
          <label htmlFor='newPassword'>Nova senha</label>
          <input
            id='newPassword'
            type='password'
            value={newPassword}
            placeholder='Digite a nova senha'
            autoComplete='new-password'
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label htmlFor='confirmPassword'>Confirmar nova senha</label>
          <input
            id='confirmPassword'
            type='password'
            value={confirmPassword}
            placeholder='Repita a nova senha'
            autoComplete='new-password'
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <input type='submit' value={loading ? 'Salvando...' : 'Salvar nova senha'} disabled={loading} />
          {message ? <p id='reset-message' className={messageType}>{message}</p> : null}
          <Link id='reset-link' to='/login'>Voltar ao login</Link>
        </form>
      </div>
      <Footer />
    </div>
  )
}
