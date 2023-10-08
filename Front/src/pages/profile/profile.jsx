import React, { useContext } from 'react'
import './profile.css'
import {IoIosContact} from 'react-icons/io'
import Header from '../../components/header/header'
import { Context } from '../../contextt/MyContext';

export default function Profile() {
  const { account } = useContext(Context);
  return (
    <div>
        <Header/>
        <div>
            <div id='account-info'>
                <p id='perfil-img'><IoIosContact/></p>
                <h1>Perfil</h1>
                <ul>
                    <p id='perfil-info'>Nome : {account.nome} </p>
                    
                    <p id='perfil-info'>Email :{account.email}</p> 
                    <div id='butoes-perfil'>
                      <button id='butao-editar'>editar</button>
                      <button id='butao-editar'>mudar senha</button>
                      <button id='butao-deletar'>deletar conta</button>

                    </div>
   
                </ul>
                
            </div>
            <div>

            </div>
        </div>
    </div>
  )
}
