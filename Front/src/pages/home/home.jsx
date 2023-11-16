import React from 'react'
import Header from '../../components/header/header'
import './home.css'
import { BsFillPersonPlusFill } from "react-icons/bs";
import {FiInstagram} from "react-icons/fi"
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';


export default function Home() {
  return (
    <div id='pagehome'>
       <Header/> 
        <img id='img-intro' src="img/omorro.jpeg" height='400' alt="plano de fundo" />
       <div id='descricao-site'>
        <h1 className='tittle-event'>Quer Ajudar o Projeto ?</h1><br />
        <p>Se registre para ficar atualizado sobre tudo do projeto</p>
          <Link to='/register'>
            <button id='descricao-butao'>Clique Aqui</button>
          </Link>
       </div>
       <div id='painel-home'>
        <div id='projeto-info'>
          <img id='imagem-projeto' src="img/omorro2.jpeg" alt="imagem" />
          <div className='event-text-box'>
          <h1 className='tittle-event'>O Projeto</h1>
          <p>Um projeto social que promove treinos, eventos e ajuda para as crianças do bairro Rua nova e a cidade de Santa rita do sapucaí.</p>
          <Link to='/info'>
            <button id='butao-projeto'>Saiba Mais</button>
          </Link>
          </div>
        </div>
       </div>
       <div id='eventos'>
          <div id='eventos-contener'>
            <div className='event-text-box'>
              <h1 className='tittle-event'>Eventos</h1>
              <p>Saiba de todos os eventos que estão rolando no projeto e nossa agenda de eventos e ações sociais.</p>
              <Link to='/events'>
                <button id='butao-projeto'>Saiba Mais</button>
              </Link>
            </div>
            <img id='img-event' src="img/eventofut.jpg" alt="eventos" />
          </div>
       </div>
       <Footer/>
      </div>
  )
}
 