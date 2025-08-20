import React from 'react'
import Navbar from '../component/Navbar'
import Food from './Food'
import Hero from '../component/Hero'
import Menu from '../component/Menu'
import Contact from '../component/Contact'
import TopFoot from '../component/TopFoot'

const Home = () => {
  return (
    <div className=''>
      <Hero />
      <Menu />
      <TopFoot />
      <Contact />
    </div>
  )
}

export default Home