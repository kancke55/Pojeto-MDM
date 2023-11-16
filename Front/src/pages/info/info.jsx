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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odit quia ratione saepe debitis, optio assumenda repudiandae corrupti quae odio fugiat cum. Fugit voluptatibus iure autem voluptate. Voluptates, eaque sit.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quibusdam, pariatur molestiae nisi perspiciatis, corrupti obcaecati rerum quaerat distinctio maiores sunt odio veniam dignissimos reiciendis consectetur amet quasi voluptas! Vero!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi mollitia, ipsum doloribus tenetur architecto vero quibusdam? Exercitationem placeat minus cupiditate laborum iure enim fuga, sapiente, omnis blanditiis quae dolorum.</p>  
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
