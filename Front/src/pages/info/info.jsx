import React from 'react'
import Header from '../../components/header/header'
import './info.css'
import Footer from '../../components/footer/footer'
import {BiFootball} from 'react-icons/bi'

export default function Info() {
  return (
    <div id='sobre'>
        <Header/>
      <div id='sobre-contener'>
        <div id='logo-sobre'>
          <div id='info-box'>
            <h1 id='titulo-info'>Sobre</h1>
          <img id='img-sobre' src="img/Meninosdomorro.jpeg" alt="Meninos do Morro" />
            <div id='info'>
            <p>O Projeto Meninos do Morro nasceu com o objetivo de transformar vidas através do esporte e da educação. Acreditamos que o futebol vai além de um simples jogo - é uma ferramenta poderosa para desenvolver habilidades, construir caráter e promover inclusão social.</p>
            <p>Nossa missão é oferecer oportunidades para crianças e jovens do bairro Rua Nova e da cidade de Santa Rita do Sapucaí, proporcionando treinos regulares, eventos esportivos e ações sociais que impactam positivamente suas vidas e comunidades.</p>
            <p>Com dedicação, paixão e o apoio de voluntários comprometidos, trabalhamos diariamente para criar um ambiente seguro e acolhedor onde cada participante pode descobrir seu potencial, aprender valores importantes e construir um futuro melhor através do esporte.</p>
            </div>
            <div id='bottom-text'>
              <p><BiFootball id='bola'/> Meninos Do Morro 2019 </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
