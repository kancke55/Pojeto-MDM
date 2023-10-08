import React, { useContext, useState } from 'react'
import Header from '../../components/header/header'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../contextt/MyContext'
import { login } from '../../service/api';
import { loginValidation } from '../../auth/formAuth'
import Footer from '../../components/footer/footer'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(Context);
  const { setAccount } = useContext(Context);

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      if(loginValidation(email, password)) {
        const response = await login(email, password);
        console.log(response);
        setToken(response.token);
        setAccount(response);
        navigate('/');
      } else { return null }
    } catch (error) {
      showMessage(error.message);
    }
  }

  return (
    <div>
        <Header/>
        <div id='page-login'>
          <form onSubmit={ handleLogin }>
            <div>
              <div id='login-tittle'>
              <h1>Login</h1>
              </div>
              <div id='login-usuario'>
                <label htmlFor="email">Usuário</label>
                <input name='email' value={ email } type="text" id='email' autoComplete='off' required onChange={(e) => setEmail(e.target.value)}/>

              </div>
              <div>
                <label htmlFor="password">Senha</label>
                <input name='password' value={ password } onChange={(e) => setPassword(e.target.value)} required type="password" id='password' autoComplete='off' />
              </div>
              <div id='login-usuario'>
                <input type="submit" value="login" class='submit'/>
                <Link  to='/recover' >Esqueceua a senha?</Link>
              </div>
            </div>
          </form>
        </div>
        <Footer />
    </div>
   
  )
}
