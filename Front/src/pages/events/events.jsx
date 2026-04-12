import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import './events.css'
import Footer from '../../components/footer/footer'

export default function Events() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch('/eve.json')
      .then(response => response.json())
      .then((events) => {
        setData(events);
        setActiveIndex(0);
      });
  }, []);

  if (!data || !data.length) return null;

  return (
    <div>
      <Header />
      <div className='event-container'>
        <div>
          <h1 className='event-tittle'>Eventos</h1>
        </div>
        <div className='context'>
          <p>Prepare-se para viver momentos inesquecíveis com o Projeto Meninos do Morro! Nossos eventos vão além do esporte - são experiências que unem diversão, aprendizado e transformação. Participe de treinos intensos, torneios emocionantes, ações sociais impactantes e celebrações comunitárias que fortalecem laços e constroem futuros brilhantes através do poder do futebol e da amizade.</p>
        </div>
        <div className='carousel'>
          <div className='evento-lista'>
            <div className='event-track' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {data.map((item) => {
                const { id, name, conteudo } = item;
                const imgEvento = item['img-evento'];
                return (
                  <div key={id} className='item'>
                    <img className='img-evento' src={imgEvento} alt={name} />
                    <div className='info'>
                      <span className='name'>{name}</span>
                      <span className='conteudo'>{conteudo}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div id='event-dots'>
          {data.map((item, index) => (
            <button
              key={item.id}
              className={index === activeIndex ? 'dot active' : 'dot'}
              onClick={() => setActiveIndex(index)}
              aria-label={`Mostrar ${item.name}`}
            />
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}
