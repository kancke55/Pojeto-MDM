import React, { useEffect, useState, useRef } from 'react'
import Header from '../../components/header/header'
import './events.css'
import Footer from '../../components/footer/footer'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Events() {
  const [data, setData] = useState([]);
  const eventoLista = useRef(null);
  const scrollAmount = 810; // 



  useEffect(() => {
    fetch ('http://localhost:5173/public/eve.json')
    .then(response => response.json())
    .then(setData);
  }, []);

    const handleLeftClick = (e) => {
    e.preventDefault();
    eventoLista.current.scrollLeft -= scrollAmount;
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    eventoLista.current.scrollLeft += scrollAmount;
  };

  if(!data || !data.length) return null;

  return (
    <div>
      <Header/>
      <div className='event-container'>
        <div>
          <h1 className='event-tittle'>Eventos</h1>
        </div>
        <div className='context'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam facilis possimus beatae quaerat voluptatem rem mollitia corrupti ab. Facilis iste at corporis rerum. Dolore, esse. Maxime nostrum quidem alias. Tenetur!</p>
        </div>
        <div className='carousel'>
          <div className='arrowB' onClick={handleLeftClick}><IoIosArrowBack /> </div>
          <div className='evento-lista' ref={eventoLista}>
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
            })   
            }
          </div>
          <div className='arrowF' onClick={handleRightClick}><IoIosArrowForward /></div>
  
        </div>
      </div>
      <Footer/>
    </div>
  )
}
