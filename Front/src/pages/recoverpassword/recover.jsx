import React from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import './recover.css';

export default function Recover() {
  return (
    <div id='recover-page'>
        <Header/>
        <div id='recover-email'>
          <h1>Recuperar Senha</h1>
          <form id='form-recover' action="recover-password">
            <p id='email-p'>Digite seu endereço de email:</p>
            <input type="email" placeholder="seu@email.com" required />
            <input type="submit" value="Enviar Link de Recuperação" />
          </form>
        </div>
        <Footer />
    </div>
  )
}
