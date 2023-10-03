import React from 'react'
import Header from '../../components/header/header'
import './recover.css';

export default function Recover() {
  return (
    <div>
        <Header/>
        <div id='recover-email'> 
          <form id='form-recover' action="recover-password">
            <p id='email-p'>Email:</p><input type="text" />
          </form>
        </div>
    </div>
  )
}
