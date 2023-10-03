import React from 'react'
import './footer.css'
import {FaInstagramSquare} from 'react-icons/fa';
import {IoLogoWhatsapp} from 'react-icons/io';
import {BsFillHouseDoorFill} from 'react-icons/bs';
import {GiModernCity} from 'react-icons/gi';
import {GiBrazil} from 'react-icons/gi';

export default function Footer() {
  return (
    <div id='footer'>
        <div id='img-logo'>
            <img id='img-footer' src="meninosdomorro.jpeg" alt="logo" />
        </div>
        <div id='lista-footer'>
                <p id='endereco-lista'>Endereço</p>
            <ul id='list-ft'>
                <li><BsFillHouseDoorFill/>Rua do Rosario(Rua Nova)</li>
                <li><GiModernCity/>Santa Rita Do Sapucaí</li>
                <li><GiBrazil/> Minas Gerais</li>
            </ul>
        </div>
        
        <div id='social-media'>
            <p>Redes Sociais</p>
            <a href="https://www.instagram.com/meninosdomorro1/"><FaInstagramSquare/> Instagram</a>
        </div>
        <div id='contato-footer'>
            <p id='contato-tittle'> Contatos </p>
            <p id='contato-zap'><IoLogoWhatsapp/>(35)998533864</p>
        </div>
    </div>
  )
}
