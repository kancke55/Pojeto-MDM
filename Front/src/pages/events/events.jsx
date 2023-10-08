import React from 'react'
import Header from '../../components/header/header'
import './events.css'
import Footer from '../../components/footer/footer'

export default function Events() {
  return (
    <div >
        <Header/>
        <div id='event-container'>
          <div>
          <h1 id='event-title'>Eventos</h1>
          </div>
          <div id='context'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam facilis possimus beatae quaerat voluptatem rem mollitia corrupti ab. Facilis iste at corporis rerum. Dolore, esse. Maxime nostrum quidem alias. Tenetur!</p>
          </div>
          <div id='evento-lista'>
            <div id='event-1'>
              <img id='img-evento' src="img/evento.png" alt="evento" />
              <h1>Evento</h1>
              <p>Saiba mais ..</p>
            </div>
            <div id='event-1'>
              <img id='img-evento' src="img/evento.png" alt="evento" />
              <h1>Evento</h1>
              <p>Saiba mais ..</p>
            </div>
            <div id='event-1'> 
              <img id='img-evento' src="img/evento.png" alt="evento" />
              <h1>Evento</h1>
              <p>Saiba mais ..</p>
            </div>
          </div>
        </div>
        <Footer/>
     </div>
  )
}
