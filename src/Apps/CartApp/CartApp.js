import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import './CartApp.css'
function CartApp() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  )
}

export default CartApp
