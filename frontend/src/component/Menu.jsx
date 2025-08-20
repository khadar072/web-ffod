import React from 'react'

const Menu = () => {
  return (
    <div className=' mt-8 lg:mt-14 flex flex-col gap-2 '>
        <h1 className='text-2xl text-center text-amber-400  font-semibold'>Get Our Best Menu Food</h1>
        <p className='text-center text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim odio voluptate earum quas a! Alias ut </p>
        <div className='px-8 md:px-60 grid grid-cols-2 py-6 md:py-12  md:grid-cols-3  gap-4'>
            <div className='h-20 rounded flex items-center shadow shadow-amber-400 justify-center   flex-1'>
                    breakfast
            </div>
            <div className='h-20 rounded flex items-center shadow shadow-amber-400 justify-center   flex-1'>
                    breakfast
            </div>
            <div className='h-20 rounded flex items-center shadow shadow-amber-400 justify-center   flex-1'>
                    breakfast
            </div>
            <div className='h-20 rounded flex items-center shadow shadow-amber-400 justify-center   flex-1'>
                    breakfast
            </div>
            <div className='h-20 rounded flex items-center shadow shadow-amber-400 justify-center   flex-1'>
                    breakfast
            </div>
            <div className='h-20 rounded flex items-center shadow shadow-amber-400 justify-center   flex-1'>
                    breakfast
            </div>
        </div>
    </div>
  )
}

export default Menu