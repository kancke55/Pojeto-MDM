import React, { useState } from 'react'
import Header from '../../components/header/header'
import './register.css'
import { createAccount } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { registerValidation } from '../../auth/formAuth';
import Footer from '../../components/footer/footer';

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
          <div id='register-box'>
            <h1>Cadastro</h1><br />
            <form onSubmit={ handleRegister } id='register-box'>
              <div>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name='name' value={ name } required onChange={(e) => setName(e.target.value)} placeholder='Digite Seu Nome' autoComplete='off' />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name='email' value={ email } required onChange={(e) => setEmail(e.target.value)} placeholder='Digite um Email Válido' autoComplete='off'/>
              </div>
              <div>
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name='password' value={ password } required onChange={(e) => setPassword(e.target.value)} placeholder='Digite Sua Senha' autoComplete='off'/>
              </div>
              <div>
                <label htmlFor="confirm">Confirmar senha</label>
                <input type="password" id="confirm" name='confirm' value={ confirm } required onChange={(e) => setConfirm(e.target.value)} placeholder='Confirme Sua Senha' autoComplete='off'/>
              </div>
              <input type="submit" name='registrar' value="Enviar" />
            </form>
          </div >
        </div>
        <Footer />
      </div>
  )
}
