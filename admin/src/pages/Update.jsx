import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct, updateSingleProduct } from '../redux/features/productSlice'

const Update = () => {
  const { id } = useParams()
  const { product, status } = useSelector((state) => state.products)
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: '',
    price: '',
    description:'',
    category:'',
    image: null,
  })

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id))
    }
  }, [dispatch, id])

  // populate form once product is fetched
useEffect(() => {
  if (product) {
    setForm({
      name: product.name || '',
      price: product.price || '',
      description: product.description || '',
      category: product.category || '',
      image: null,
    })
  }
}, [product])


  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setForm({ ...form, image: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('price', form.price)
    formData.append('description', form.description)
    formData.append('category', form.category)
    if (form.image) {
      formData.append('image', form.image)
    }

    dispatch(updateSingleProduct({ id, formdata: formData }))
  }



  return (
    <div className='md:pl-[210px] lg:pl-[270px] pt-1.5 px-2 lg:pt-3'>
      <h2 className='text-xl font-bold mb-4'>Update Product</h2>

      {product && (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block font-medium'>Name</label>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              className='border p-2 rounded w-full'
            />
          </div>
           <div>
            <label className='block font-medium'>Description</label>
            <input
              type='text'
              name='description'
              value={form.description}
              onChange={handleChange}
              className='border p-2 rounded w-full'
            />
          </div>
           <div>
            <label className='block font-medium'>Category</label>
            <input
              type='text'
              name='category'
              value={form.category}
              onChange={handleChange}
              className='border p-2 rounded w-full'
            />
          </div>

          <div>
            <label className='block font-medium'>Price</label>
            <input
              type='number'
              name='price'
              value={form.price}
              onChange={handleChange}
              className='border p-2 rounded w-full'
            />
          </div>

          <div>
            <label className='block font-medium'>Image</label>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={handleChange}
              className='border p-2 rounded w-full'
            />
          </div>

          {/* Show existing image */}
          <div>
            <p className='font-medium mb-2'>Current Image:</p>
            <img
              className='w-40 h-40 object-cover'
              src={`http://localhost:5002/upload/${product.image}`}
              alt={product.name || 'Product'}
            />
          </div>

          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Update
          </button>
        </form>
      )}
    </div>
  )
}

export default Update
