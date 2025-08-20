import React, { useState } from 'react'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import Update from './pages/Update'
import Orders from './pages/Orders'
import Login from './pages/Login'
import { useSelector } from 'react-redux'


const App = () => {
  const token = localStorage.getItem('atoken')// track login
  const auth = useSelector((state) => state.products.auth?.atoken);

  return (
    <div className=''>
      {token || auth ? (
        <div >
          <Navbar />
          <div className='pt-[80px]'>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/add' element={<AddProduct />} />
              <Route path='/product' element={<Products />} />
              <Route path='/update/:id' element={<Update />} />
              <Route path='/order' element={<Orders />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      )}
    </div>
  )
}

export default App
