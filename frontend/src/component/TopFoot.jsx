import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProduct } from '../redux/features/userSlice';
import { IoCartSharp } from "react-icons/io5";
import { addCart } from '../redux/features/cartSlice';
const TopFoot = () => {
    const dispatch = useDispatch()
    const { data: products = [], status, error } = useSelector(state => state.products)


    useEffect(() => {
        if (status === 'idle') {
            dispatch(getProduct())
        }
    }, [status, dispatch])
    return (
        <div className='mt-10 flex flex-col gap-3 px-1 lg:px-32'>
            <p className='text-3xl font-bold text-amber-400 pb-3'>Top Foods</p>
            <div>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {
                        products.slice(0,8).map((prod, index) => (
                            <div key={index} className='flex flex-col border border-amber-400 rounded p-2'>
                                <img
                                    src={`http://localhost:5002/upload/${prod.image}`}
                                    alt={prod.name}
                                    className="w-full h-44 lg:h-52 object-cover rounded"
                                />
                                {/* Make content fill and push footer to bottom */}
                                <div className='flex flex-col justify-between flex-1  pt-4'>
                                    <div>
                                        <p className='text-2xl font-semibold'>{prod.name}</p>
                                        <p className='text-md font-light text-wrap w-full text-amber-400'>{prod.description}</p>
                                    </div>
                                    <div className='flex items-center justify-between mt-4'>
                                        <p className='text-2xl font-semibold'>${prod.price}</p>
                                        <div className='flex gap-0.5  flex-row items-center'>
                                            <p className='text-3xl pb-2'>+</p>
                                            <IoCartSharp onClick={() => dispatch(addCart({
                                                productId: prod._id,
                                                name: prod.name,
                                                price: prod.price,
                                                image: prod.image
                                            }))} size={30} className='text-amber-400' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TopFoot