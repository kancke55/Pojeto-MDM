import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Context } from '../../contextt/MyContext';
import { editAccount } from '../../service/api';
import './changePassword.css';

export default function ChangePassword() {
  const { account, token, setAccount } = useContext(Context);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!account?.nome) {
      navigate('/');
    }
  }, [account, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!password || password !== confirm) {
        return alert('As senhas devem ser iguais e não podem ficar vazias.');
      }

      const updated = await editAccount({ password }, token);
      if (updated) {
        if (updated.email || updated.nome) {
          setAccount({ ...account, ...updated });
        }
        alert('Senha alterada com sucesso.');
        navigate('/profile');
      }
    } catch (error) {
      alert(error.message || 'Erro ao alterar senha.');
    }
  };

  return (
    <div className="profile-page">
      <Header />
      <main className="change-password-wrapper">
        <section className="change-password-card">
          <h1>Alterar Senha</h1>
          <p>Escolha uma nova senha segura para sua conta.</p>

          <form className="change-password-form" onSubmit={handleSubmit}>
            <label htmlFor="password">Nova senha</label>
            <input
              id="password"
              type="password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirm">Confirmar senha</label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              autoComplete="new-password"
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <div className="change-password-actions">
              <button type="button" className="button button-secondary" onClick={() => navigate('/profile')}>
                Voltar
              </button>
              <button type="submit" className="button button-primary">
                Atualizar senha
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
