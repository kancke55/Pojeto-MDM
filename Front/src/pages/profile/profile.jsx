import React, { useContext, useEffect } from 'react'
import './profile.css'
import {IoIosContact} from 'react-icons/io'
import Header from '../../components/header/header'
import { Context } from '../../contextt/MyContext';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../service/api';

export default function Profile() {
  const { account, setAccount, setToken, token } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account?.nome) {
      navigate('/');
    }
  }, [account, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Deseja realmente deletar sua conta? Esta ação não pode ser desfeita.');
    if (!confirmDelete) return;

    try {
      await deleteAccount(account?.id, token);
      setAccount({});
      setToken('');
      alert('Conta deletada com sucesso.');
      navigate('/login');
    } catch (error) {
      alert(error.message || 'Erro ao deletar a conta.');
    }
  };

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-wrapper">
        <section className="profile-card">
          <div className="profile-avatar">
            <IoIosContact />
          </div>

          <div className="profile-header">
            <h1>Perfil</h1>
            <p className="profile-subtitle">Veja e gerencie suas informações</p>
          </div>

          <div className="profile-details">
            <div className="profile-row">
              <span className="profile-label">Nome</span>
              <span className="profile-value">{account?.nome || '-'}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span className="profile-value">{account?.email || '-'}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="button button-edit" type="button" onClick={() => navigate('/profile/edit')}>Editar</button>
            <button className="button button-password" type="button" onClick={() => navigate('/profile/password')}>Mudar senha</button>
            <button className="button button-delete" type="button" onClick={handleDelete}>Deletar conta</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
