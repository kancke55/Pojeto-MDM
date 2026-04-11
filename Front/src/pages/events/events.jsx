import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import './events.css'
import Footer from '../../components/footer/footer'

export default function Events() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch ('http://localhost:5173/public/eve.json')
    .then(response => response.json())
    .then(console.log)
  }, [])
  return (
    <div>
      <Header/>
      <div id='event-container'>
        <div>
          <h1 id='event-tittle'>Eventos</h1>
        </div>
        <div id='context'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam facilis possimus beatae quaerat voluptatem rem mollitia corrupti ab. Facilis iste at corporis rerum. Dolore, esse. Maxime nostrum quidem alias. Tenetur!</p>
        </div>
        <div id='evento-lista'>
          <div className='event-1'>
            <img className='img-evento' src="img/evento.png" alt="evento" />
            <div className='info'>
              <span className='name'>Evento 1</span>
              <span className='conteudo'>Saiba mais</span>
            </div>

          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
