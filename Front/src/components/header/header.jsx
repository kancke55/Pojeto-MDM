import React, { useContext } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import Info from '../../pages/info/info'
import { Context } from '../../contextt/MyContext'

export default function Header() {
  const { account } = useContext(Context);
  return (
    <div id='header'>
        <Link id='home-link' to='/'>
            <h3 id='header-home'>Home</h3>
        </Link>
        <ul id='list'>
          <Link to='/events'>
            <li className='list-item'>Eventos</li>
          </Link>
          <Link to='/info'>
            <li className='list-item'>Sobre</li>
          </Link>
          { account.nome ?  <li className='list-item'><p style={{marginTop: '5px', color: 'red'}}>{ account.nome }</p></li> : 
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
        </Link> }
          
        </ul>
    </div>

  )
}
