import React, { useState } from 'react'
import { IoIosLogIn, IoMdAdd } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdClose, MdOutlineDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LiaFirstOrder } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/productSlice';
const Navbar = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = (e) =>{
        dispatch(logout());      // clear redux + localStorage
        window.location.reload();
    }
    return (
        <div className='flex fixed z-50 bg-white flex-row w-full border px-2 md:px-10 border-amber-400 items-center justify-between h-20'>
            <h1 className='text-3xl font-bold text-amber-600'>FOOD</h1>
            <div className='flex flex-row  justify-center gap-4'>
                <IoIosLogIn size={30} onClick={handleLogout} className='text-amber-600 cursor-pointer' />
                {
                    open ?
                        <MdClose onClick={() => setOpen(!open)} size={30} className='block cursor-pointer md:hidden text-amber-400' />
                        : 
                        <HiOutlineMenuAlt3 onClick={() => setOpen(!open)} size={30} className='block cursor-pointer md:hidden text-amber-400' />
                }
                <div className={`fixed bg-white top-20 left-0 w-[250px] flex flex-col md:hidden h-full gap-2 border border-amber-400 transform  transition-transform duration-400 ${open ? "translate-x-0" : "-translate-x-full"}`}>
                    <Link to='/' onClick={()=>setOpen(!open)} className='flex flex-row gap-4 items-center justify-start px-6 pt-8 '>
                        <MdOutlineDashboard className='text-amber-300' size={25} />
                        <p className='text-xl '>Dashboard</p>
                    </Link>
                    <Link to='add' onClick={()=>setOpen(!open)} className='flex flex-row gap-4 items-center justify-start px-6 pt-6'>
                        <IoMdAdd className='text-amber-300' size={25} />
                        <p className='text-xl '>Add</p>
                    </Link>
                    <Link to='product' onClick={()=>setOpen(!open)} className='flex flex-row gap-4 items-center justify-start px-6 pt-6'>
                        <MdOutlineProductionQuantityLimits className='text-amber-300' size={25} />
                        <p className='text-xl '>Product</p>
                    </Link>
                    <Link to='order' onClick={()=>setOpen(!open)} className='flex flex-row gap-4 items-center justify-start px-6 pt-6'>
                        <LiaFirstOrder className='text-amber-300' size={25} />
                        <p className='text-xl '>Order</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
