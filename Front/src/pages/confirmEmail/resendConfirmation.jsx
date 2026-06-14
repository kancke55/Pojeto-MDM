import React, { useState, useEffect } from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { resendConfirmationEmail } from '../../service/api'
import { useNavigate, useLocation } from 'react-router-dom'
import './resendConfirmation.css'

export default function ResendConfirmation() {
  const location = useLocation()
  const initialEmail = location.state?.email || ''
  const [email, setEmail] = useState(initialEmail)
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [infoMessage, setInfoMessage] = useState(
    initialEmail ? `Conta criada com sucesso! Enviamos um email de confirmação para ${initialEmail}. Verifique sua caixa de entrada ou spam.` : ''
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResend = async (e) => {
    e.preventDefault()

    if (!email) {
      setMessage('Por favor, digite seu email.')
      setMessageType('error')
      return
    }

    const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
    if (!emailValidation) {
      setMessage('Email inválido.')
      setMessageType('error')
      return
    }

    try {
      setLoading(true)
      setMessage('')
      const response = await resendConfirmationEmail(email)
      setMessage(response.message)
      setMessageType('success')
      setCountdown(60)
      setEmail('')
    } catch (error) {
      const errorMsg = error.message
      if (errorMsg.includes('Aguarde')) {
        const match = errorMsg.match(/(\d+)\s+segundos/)
        if (match) {
          setCountdown(parseInt(match[1]))
        }
      }
      setMessage(errorMsg)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id='page-resend-confirmation'>
      <Header />
      <div id='resend-confirmation-page'>
        <div id='resend-confirmation-box'>
          <h1>Reenviar Código de Confirmação</h1>
          {infoMessage && <p className='info-message'>{infoMessage}</p>}
          <p>Não recebeu o email de confirmação? Digite seu email para reenviarmos o código.</p>
          <br />
          <form onSubmit={handleResend} id='resend-confirmation-form'>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Digite seu email'
                autoComplete='off'
                disabled={countdown > 0}
              />
            </div>
            <input
              type='submit'
              value={countdown > 0 ? `Aguarde ${countdown}s` : 'Reenviar Código'}
              disabled={loading || countdown > 0}
            />
          </form>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <div id='resend-confirmation-links'>
            <p>
              Já confirmou seu email? <a href='/login'>Faça login</a>
            </p>
            <p>
              Ainda não tem conta? <a href='/register'>Cadastre-se</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
