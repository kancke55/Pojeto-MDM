import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Context } from '../../contextt/MyContext';
import { editAccount } from '../../service/api';
import './editProfile.css';

export default function EditProfile() {
  const { account, token, setAccount } = useContext(Context);
  const [name, setName] = useState(account?.nome || '');
  const [email, setEmail] = useState(account?.email || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!account?.nome) {
      navigate('/');
    }
  }, [account, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name.trim() || !email.trim()) {
        return alert('Preencha nome e email corretamente.');
      }

      const updated = await editAccount({ name, email }, token);
      if (updated) {
        setAccount({ ...account, nome: name, email });
        alert('Perfil atualizado com sucesso.');
        navigate('/profile');
      }
    } catch (error) {
      alert(error.message || 'Erro ao atualizar perfil.');
    }
  };

  return (
    <div className="profile-page">
      <Header />
      <main className="edit-profile-wrapper">
        <section className="edit-profile-card">
          <h1>Editar Perfil</h1>
          <p>Atualize suas informações de conta abaixo.</p>

          <form className="edit-profile-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="edit-profile-actions">
              <button type="button" className="button button-secondary" onClick={() => navigate('/profile')}>
                Cancelar
              </button>
              <button type="submit" className="button button-primary">
                Salvar alterações
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
