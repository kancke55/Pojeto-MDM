import React, { useState } from 'react'
import './donate.css'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const amounts = [30, 50, 100, 150];

  const handleDonate = () => {
    window.alert(`Obrigado pela intenção de doar R$ ${selectedAmount}! Use o PIX abaixo ou entre em contato para finalizar.`);
  }

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
            <h2>Escolha um valor</h2>
            <p>Selecione um valor rápido e clique em Doar. O PIX está logo abaixo.</p>
          </div>

          <div className="donate-amounts">
            {amounts.map((amount) => (
              <button
                key={amount}
                type="button"
                className={selectedAmount === amount ? 'amount-button active' : 'amount-button'}
                onClick={() => setSelectedAmount(amount)}
              >
                R$ {amount}
              </button>
            ))}
          </div>

          <button className="donate-action" type="button" onClick={handleDonate}>
            Doar R$ {selectedAmount}
          </button>
        </section>

        <section className="donate-pix-card">
          <div>
            <h3>Doação via PIX</h3>
            <p>Use o PIX abaixo para fazer sua contribuição de forma simples e segura.</p>
          </div>

          <div className="pix-details">
            <p><strong>Chave PIX:</strong> 00000000-0000-0000-0000-000000000000</p>
            <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
            <p><strong>Nome:</strong> Meninos do Morro</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
