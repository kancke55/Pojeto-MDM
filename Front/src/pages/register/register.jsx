import React, { useState } from 'react'
import Header from '../../components/header/header'
import './register.css'
import { createAccount } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { registerValidation } from '../../auth/formAuth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleRegister = async (e) => {
    try {
      e.preventDefault()
      if(password !== confirm){
        return window.alert('Senha e confirmar senha são valores diferentes')
      } if(registerValidation(name, email, password)) {
        await createAccount(name, email, password);
        navigate('/login');
      } else { return null }

    } catch (error) {
      showMessage(error.message);
    }
  }

  return (
      <div id='page-register'>
        <Header/>
        <div id='register-page'>
          <div>
            <h1 id>Cadastro</h1><br />
            <form onSubmit={ handleRegister } id='register-box'>
              Nome <input type="text" name ='name' value={ name } required onChange={(e) => setName(e.target.value)} placeholder='Digite Seu Nome' autoComplete='off' /> <br />
              Email <input type="text" name='email' value={ email } required onChange={(e) => setEmail(e.target.value)} placeholder='Digite um Email Válido' autoComplete='off'/><br />
              Senha <input type="password" name='password' value={ password } required onChange={(e) => setPassword(e.target.value)} placeholder='Digite Sua Senha' autoComplete='off'/><br />
              Confirmar senha <input type="password" name='password' value={ confirm } required onChange={(e) => setConfirm(e.target.value)} placeholder='Digite Sua Senha' autoComplete='off'/><br />
              <br />
             <input type="submit" name='registrar' value="Enviar" />
            </form>
          </div >
        </div>
            
      </div>
  )
}
