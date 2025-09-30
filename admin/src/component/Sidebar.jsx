import React from 'react'
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { LiaFirstOrder } from "react-icons/lia";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <div className='hidden md:flex md:flex-col gap-4 w-[200px] lg:w-[250px] fixed h-full border border-amber-400'>
            {/* <Link to='/' className='flex flex-row gap-4 items-center justify-start px-6 pt-8 '>
                <MdOutlineDashboard className='text-amber-300' size={25} />
                <p className='text-xl '>Dashboard</p>
            </Link> */}
            <Link to='add-items' className='flex flex-row gap-4 items-center justify-start px-6 pt-6'>
                <IoMdAdd className='text-amber-300' size={25} />
                <p className='text-xl '>Add-Items</p>
            </Link>
            <Link to='product' className='flex flex-row gap-4 items-center justify-start px-6 pt-6'>
                <MdOutlineProductionQuantityLimits className='text-amber-300' size={25} />
                <p className='text-xl '>Product</p>
            </Link>
            <Link to='order' className='flex flex-row gap-4 items-center justify-start px-6 pt-6'>
                <LiaFirstOrder className='text-amber-300' size={25} />
                <p className='text-xl '>Order</p>
            </Link>
        </div>
    )
}

export default Sidebar
