import React from 'react'
import Header from '../../components/header/header'
import './info.css'

export default function Info() {
  return (
    <div id='sobre'>
        <Header/>
      <div id='sobre-contener'>
        <div id='logo-sobre'>
          <div id='info-box'>
            <h1 id='titulo-info'>Sobre</h1>
          <img id='img-sobre' src="public/img/meninosdomorro.jpeg" alt="Meninos do Morro" />
            <p id='info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odit quia ratione saepe debitis, optio assumenda repudiandae corrupti quae odio fugiat cum. Fugit voluptatibus iure autem voluptate. Voluptates, eaque sit.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quibusdam, pariatur molestiae nisi perspiciatis, corrupti obcaecati rerum quaerat distinctio maiores sunt odio veniam dignissimos reiciendis consectetur amet quasi voluptas! Vero!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi mollitia, ipsum doloribus tenetur architecto vero quibusdam? Exercitationem placeat minus cupiditate laborum iure enim fuga, sapiente, omnis blanditiis quae dolorum.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
