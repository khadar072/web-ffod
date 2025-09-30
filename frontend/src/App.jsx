import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Header from './component/Header'
import Navbar from './component/Navbar'
import Food from './pages/Food'
import Contact from './pages/Contact'
import MyOrder from './pages/MyOrder'
import Footer from './component/Footer'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
const App = () => {
  return (
    <div className=''>
      <div className='fixed w-full top-0 left-0 z-50 '>
        <Header />
        <Navbar />
      </div>
      <div className="pt-[108px]">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/food' element={<Food />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-order' element={<MyOrder />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
