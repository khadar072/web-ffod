import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { MdLightMode } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { FaCartArrowDown } from "react-icons/fa";
import { logout } from '../redux/features/userSlice';
const Navbar = () => {
    const token = localStorage.getItem('token')
    const [open, setOpen] = useState(false) 
    const [dark, setDark] = useState(false)
    const dispatch = useDispatch();
    const cartCount = useSelector(state =>
        state.cart.cart.reduce((total, item) => total + item.quantity, 0)
    )



    const handleLogout = (e) => {
        dispatch(logout());      // clear redux + localStorage
        window.location.reload();
    }

    return (
        <div className='w-full z-50 bg-white shadow h-16 px-2 md:px-20 flex flex-row items-center justify-between '>
            <div className=' relative flex flex-row justify-center items-center'>
                <p className='text-3xl font-bold text-amber-600'>FOOD</p>
                <button className='border rounded-full'>
                    {
                        dark ?
                            <MdLightMode onClick={() => setDark(!dark)} size={25} className='text-amber-400 p-1 cursor-pointer absolute top-5 border border-gray-400 rounded-full' />
                            :
                            <MdDarkMode onClick={() => setDark(!dark)} size={25} className='text-amber-400 p-1 cursor-pointer absolute top-5 border border-gray-400 rounded-full' />
                    }
                </button>
            </div>
            <div className='hidden md:flex md:flex-row gap-3 text-md font-semibold text-gray-500 items-center justify-center'>
                <Link to='/' >
                    Home
                </Link>
                {/* <Link to='/food' >
                    All-Food
                </Link> */}
                <Link to='/contact' >
                    Contact
                </Link>
                {
                    token && <Link to='/my-order' >
                        My-Order
                    </Link>
                }
                <div className='flex flex-row relative items-center justify-center '>
                    <Link to='/cart'><FaCartArrowDown size={25} className='text-amber-400 ' />
                        {cartCount == 0 ?
                            <p className='rounded-full text-white bg-red-500 px-2 text-sm absolute -top-3 -right-3'>
                                0
                            </p>
                            : (
                                <p className='rounded-full text-white bg-red-500 px-2 text-sm absolute -top-3 -right-3'>
                                    {cartCount}
                                </p>
                            )}
                    </Link>
                </div>
                <div className='flex flex-row gap-4'>
                    {
                        token ? <IoIosLogOut size={30} onClick={handleLogout} className='ml-10 text-amber-400' />
                            :
                            <Link to='/login' className='ml-10 bg-amber-400 text-white px-3 py-2 rounded'>Create Account</Link>
                    }
                </div>
            </div>
            {
                open ?
                    <RiCloseFill onClick={() => setOpen(!open)} size={40} className='text-amber-400 flex md:hidden cursor-pointer' />
                    : <HiOutlineMenuAlt3 onClick={() => setOpen(!open)} size={40} className='text-amber-400 flex md:hidden cursor-pointer' />
            }

            <div className={`w-[300px] mt-[106px] pt-8 pl-6 border border-amber-400 flex flex-col gap-4 md:hidden bg-white fixed top-0 left-0 h-full  transform transition-transform duration-500 ${open ? "translate-x-0" : "-translate-x-full"} `}>
                <Link onClick={() => setOpen(!open)} to='/' >
                    Home
                </Link>
                <Link onClick={() => setOpen(!open)} to='/food' >
                    All-Food
                </Link>
                <Link onClick={() => setOpen(!open)} to='/contact' >
                    Contact
                </Link>
                {
                    token && <Link onClick={() => setOpen(!open)} to='/my-order' >
                        My-Order
                    </Link>
                }
            </div>
        </div>
    )
}

export default Navbar