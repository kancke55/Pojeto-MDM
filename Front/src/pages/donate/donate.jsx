import React from 'react';
import './donate.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

export default function Donate() {
  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText('082.86687604');
      window.alert('Chave PIX copiada para a área de transferência.');
    } catch {
      window.alert('Não foi possível copiar a chave PIX. Copie manualmente.');
    }
  };

  return (
    <div className="donate-page">
      <Header />

      <main className="donate-container">
        <section className="donate-hero">
          <div className="donate-hero-text">
            <span className="donate-badge">Apoie nossa causa</span>
            <h1>Doe para transformar vidas no bairro</h1>
            <p>Contribua com qualquer valor e ajude o projeto a levar educação, apoio e oportunidades para quem mais precisa.</p>
            <div className="donate-highlights">
              <div>
                <strong>Comunidade</strong>
                <span>Recursos locais para crianças e jovens.</span>
              </div>
              <div>
                <strong>Impacto</strong>
                <span>Seu apoio gera novas chances.</span>
              </div>
            </div>
          </div>
          <div className="donate-hero-image">
            <img src="/img/doar.png" alt="Doação" />
          </div>
        </section>

        <section className="donate-card">
          <div className="donate-card-header">
            <h2>Doação PIX</h2>
            <p>Use a chave PIX abaixo para fazer sua doação. Toque no botão para copiar.</p>
          </div>

          <button className="donate-action" type="button" onClick={handleCopyPix}>
            Copiar chave PIX
          </button>

          <p className="donate-note">Para doar, use a chave PIX abaixo ou entre em contato para combinar outro valor.</p>
        </section>

        <section className="donate-pix-card">
          <div>
            <h3>Doação via PIX</h3>
            <p>Use o PIX abaixo para fazer sua contribuição de forma simples e segura.</p>
          </div>

          <div className="pix-details">
            <p><strong>Chave PIX:</strong> 082.86687604</p>
            <p><strong>Nome:</strong> Liliane da Silva</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

