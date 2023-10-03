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
       <div id='intro'>
        <div id='text-box'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et ipsum, ducimus excepturi est doloribus incidunt magni vel numquam laboriosam facere id iste, officiis nemo quam itaque? Vitae, sed. Minus, accusantium!</p>
        </div>
       <img id='img-intro' src="img/fundo.jpg" width='700' height='700' alt="plano de fundo" />
       </div>
        <div id='cadastro'>
          <p>Você ainda não tem cadastro ?</p>
          <div id='botao1'>
            <Link to='/register'>
            <p>Clique aqui</p>
            <BsFillPersonPlusFill/>
            </Link>
        </div>
        </div>
        <Footer/>
    </div>
  )
}
 