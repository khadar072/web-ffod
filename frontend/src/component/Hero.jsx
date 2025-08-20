import React from 'react'
import heroImage from "../assets/pic.jpg"
const Hero = () => {
  return (
    <div className=' z-0  relative '>
        <img 
            src={heroImage} 
            alt=""
            className='w-full h-[450px] md:h-[500px] lg:h-[650px] object-cover ' 
        />
        <div className='inset-0 absolute flex bg-black/15 items-center  justify-center'>
            <div className='text-center text-white p-6'>
                <h1 className='text-4xl md:text-9xl font-bold uppercase'>welcome</h1>
                <p className='text-center text-xl md:text-2xl'>explore your needs now and get fast ffod</p>
                <button className=' bg-amber-400 px-6 cursor-pointer py-2 rounded-md mt-2'>Order Now</button>
            </div>
        </div>
    </div>
  )
}

export default Hero