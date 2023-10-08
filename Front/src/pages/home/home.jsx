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
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui voluptates, sequi molestiae inventore dolor similique! Quas illum obcaecati similique alias facere distinctio maiores illo fugit asperiores consectetur, at magnam veritatis.</p>
          <Link to='/register'>
            <button id='descricao-butao'>Clique Aqui</button>
          </Link>
       </div>
       <div id='painel-home'>
        <div id='projeto-info'>
          <img id='imagem-projeto' src="img/omorro2.jpeg" alt="imagem" />
          <div className='event-text-box'>
          <h1 className='tittle-event'>O Projeto</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium non, temporibus tempora enim doloremque eaque quas sequi placeat maiores in deleniti blanditiis recusandae, perferendis incidunt. Atque dignissimos quod incidunt ipsam.</p>
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
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quo minima at doloribus, nostrum inventore harum quidem magnam est deleniti earum suscipit, numquam ipsa impedit laudantium perspiciatis quos alias placeat.</p>
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
 