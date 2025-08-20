import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/features/productSlice'
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Products = () => {
  const { data: products = [], status, error } = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts())
    }
  }, [status, dispatch])

  return (
    <div className=' md:pl-[210px] lg:pl-[270px] py-1.5 px-2 lg:pt-3'>
      <p className='text-3xl font-semibold mb-6'>Products</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          products.map((prod, index) => (
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
                  <div className='flex gap-3 items-center'>
                    <CiEdit size={25} className='text-amber-400 cursor-pointer' />
                    <MdDeleteOutline size={25} className='text-amber-400 cursor-pointer' />
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Products
