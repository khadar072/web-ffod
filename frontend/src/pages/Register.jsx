import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userRegister } from '../redux/features/userSlice'
const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()


const handleSubmit = async (e) => {
  e.preventDefault();

  const resultAction = await dispatch(userRegister({ email, password, name }));

  if (resultAction.payload) {
    // ✅ Reset inputs
    setEmail("");
    setPassword("");
    setName("");

    // ✅ Navigate
    navigate("/login");
  } else {
    alert("Register failed");
  }
};


  return (
    <div className='px-4 md:pl-[150px] xl:px-[500px] xl:py-[150px] py-20 flex items-center justify-center w-full'>
      <div className='flex flex-col gap-4 px-3 py-4 shadow shadow-amber-400 w-[500px]'>
        <p className='text-center text-xl font-bold'>Register</p>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label className='text-xl text-black' htmlFor="">Name</label>
            <input type="text" value={name} placeholder='email' onChange={(e) => setName(e.target.value)} className='px-4 py-2 border border-amber-400 rounded' />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-xl text-black' htmlFor="">Email</label>
            <input type="text "value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} className='px-4 py-2 border border-amber-400 rounded' />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-xl text-black' htmlFor="">Password</label>
            <input type="text" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} className='px-4 py-2 border border-amber-400 rounded' />
          </div>
          <button type='submit' className='px-4 py-2 w-full text-white mt-3 bg-amber-400 rounded'>Submit</button>
            <p>already have account? <span onClick={()=>navigate('/login')} className='underline text-amber-400 cursor-pointer'>Login</span></p>
        </form>
      </div>
    </div>
  )
}

export default  Register 
