import React, { useContext } from 'react'
import { Context } from '../../contextt/MyContext';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './userMenu.css';
import { Link } from 'react-router-dom';


export default function UserMenu({setActive}) {
    const {account, setAccount } = useContext(Context);
    const navigate = useNavigate();
    const logout = () => {
        setAccount('');
        setActive(false);
        navigate('/');
    }
  return (
    <div>
        <div id='menu-user'>
            <p id='user-name'>{account.nome.split(" ", 1)}</p>
            <div className='border' />
            <ul className='test'>
                <Link to='/profile'><li className='test'>Meu Perfil</li></Link>
                <Link to='/donate' ><li className='test'>Doação</li></Link>
                <div className='border' />
                <li className='test' id='logout' style={{marginTop: '50vh'}} onClick={() => logout()}>Sair</li>
            </ul>
        </div>
    </div>
  )
}

UserMenu.propTypes = {
    setActive: PropTypes.func.isRequired
  };
