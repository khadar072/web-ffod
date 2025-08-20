import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
const Header = () => {
    return (
        <div className='h-10 z-50 bg-amber-400 w-full flex flex-row justify-between px-6 md:px-10 items-center'>
            <div className='flex flex-row gap-2.5'>
                <FaFacebook size={23} className='text-white mr-1 md:mr-3' />
                <IoLogoWhatsapp size={23} className='text-white mr-1 md:mr-3' />
                <FaInstagramSquare size={23} className='text-white mr-1 md:mr-3' />
                <FaTiktok size={23} className='text-white mr-1 md:mr-3' />
            </div>
            <div className='flex flex-row gap-12 justify-center items-center'>
                <p className='text-white hidden md:flex'>Welcome To High Quility Food</p>
                <p className='text-white '>Contact Us <span>+252906112646</span></p>
            </div>

        </div>
    )
}

export default Header