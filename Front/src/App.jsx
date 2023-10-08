
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Events from './pages/events/events';
import Info from './pages/info/info';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Recover from './pages/recoverpassword/recover';
import Profile from './pages/profile/profile';
import Donate from './pages/donate/donate';

function App() {
  
  
  return (
    <Routes>
      <Route exact path='/' element = {<Home/>}/>
      <Route exact path='/events' element = {<Events/>}/>
      <Route exact path='/info' element = {<Info/>}/>
      <Route exact path='/register' element = {<Register/>}/>
      <Route exact path='/login' element = {<Login/>}/>
      <Route exact path='/recover' element = {<Recover/>}/>
      <Route exact path='/profile' element = {<Profile/>}/>
      <Route exact path='/donate' element = {<Donate/>}/>
    </Routes>
  )
}

export default App
