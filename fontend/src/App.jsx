import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './page/Home/Home.jsx'
import Cart from './page/Cart/Cart.jsx'
import PlaceOrder from './page/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import Verify from './page/Verify/Verify.jsx'
import MyOrders from './page/MyOrders/MyOrders.jsx'
import Success from './page/Success/Success.jsx'
import False from './page/False/False.jsx'

const App = () => {

  const[showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>} 
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/false' element={<False/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App