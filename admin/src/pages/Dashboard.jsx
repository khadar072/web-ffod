import React from 'react'

const Dashboard = () => {
  return (
    <div className=' md:pl-[210px] lg:pl-[270px] pt-1.5 px-2 lg:pt-3'>
      <div className=''>
        <p className='text-3xl font-semibold mb-6'>Dashboard</p>
        <div className='flex flex-row gap-4 px-0  lg:pr-14 xl:pr-16  flex-wrap'>
            <div className='h-20 shadow rounded flex items-center justify-center shadow-amber-400 flex-1 '>
                <p>100</p>
            </div>
            <div className='h-20 shadow rounded flex items-center justify-center shadow-amber-400 flex-1 '>
                <p>100</p>
            </div>
            <div className='h-20 shadow rounded flex items-center justify-center shadow-amber-400 flex-1 '>
                <p>100</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
