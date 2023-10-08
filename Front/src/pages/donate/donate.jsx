import React from 'react'
import './donate.css'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

export default function Donate() {
  return (
    <div>
        <Header/>
        <div id='donate-info'>
            <img id='img-donate' src="/img/doar.png" alt="doação" />
            <h1>Doações</h1>
            <div id= 'text-donate'>
            <p>Faça Sua Doação de qualquer valor para ajudar o projeto !!</p>
            </div>
            <button id='butao-donate'>Doar</button>
        </div>
        <div id='donate-pix'>
          <p>Se preferir pode fazer doação via pix. </p>
          <p>Cnpj : xxxxxxxxxxxxxxxx</p>
          <p>Meninos Do morro</p>
        </div>
        <Footer />
    </div>
  )
}
