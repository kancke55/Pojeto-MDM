import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../contextt/MyContext'
import UserMenu from '../userMenu/userMenu'
import Info from '../../pages/info/info'
import { IoMdContact } from 'react-icons/io';
import './header.css'
import {GiHamburgerMenu} from 'react-icons/gi';
import {FaUserCircle} from 'react-icons/fa';


export default function Header() {
  const { account, setAccount } = useContext(Context);
  const [ active, setActive ] = useState(false);
  window.addEventListener('click', (e) => {
    if(e.target.classList.value !== 'test'){
      return setActive(false);
    }
  });


  const isActive = () => {
      return setActive(true);
  }

function openNav() {
    document.getElementById("menu-list").style.width = '100%';
    
  }

  function closeNav() {
    document.getElementById("menu-list").style.width = '0%';
    
  }

  function openLog() {
    document.getElementById("login-menu").style.width = '40%';
    
  }

  function closeLog() {
    document.getElementById("login-menu").style.width = '0%';
    
  }



  return (
    <div id='header'>
      <div id='menu-normal'>
        <button type="button" id='ham' onClick={openNav}><GiHamburgerMenu/></button>
        
        <Link id='home-link' className='resp' to='/'>
            <h3 id='header-home'>Home</h3>
        </Link>
        <ul id='list' className='test'>
          <Link to='/events'>
            <li className='list-item resp'>Eventos</li>
          </Link>
          <Link to='/info'>
            <li className='list-item resp'>Sobre</li>
          </Link>
          { account.nome ? <h1 className='test' onClick={() => isActive()} style={active ? {marginLeft: '200px'} : null} id='icon'>{account.nome[0]}</h1> : 
          <Link id='button-link' to='/login'>
          <li className='list-item'>
          <button className='btn'>
              Login
              <svg id='login-icon' xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
              <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
          </button>
          </li>
        </Link>
        }
        {active ? <UserMenu setActive={setActive} /> : null}
          
        </ul>

      </div>
      <div id='menu-list' >
        <div id='menu-over'>
          <Link  to='/'>
          Home
          </Link>
          <Link to='/events'>
            Eventos
          </Link>
          <Link to='/info'>
            Sobre
          </Link>
        </div>
        <div id='mask' onClick={closeNav}/>

      </div>
      <div id='button-header'> 
          <button type="button" id='ham' onClick={openNav}><GiHamburgerMenu/></button>
      </div>
    </div>

  )
}
