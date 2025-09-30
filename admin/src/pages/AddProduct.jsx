import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/features/productSlice'
import { useNavigate } from 'react-router-dom'
const AddProduct = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)
  const dispetch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append('name', name)
    formdata.append('price', price)
    formdata.append('description', description)
    formdata.append('category', category)
    formdata.append('image', image)
    e.preventDefault()
    dispetch(addProduct(formdata))
    setName('');
    setPrice('');
    setDescription('');
    setCategory('');
    setImage(null);
    navigate('/product')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the selected file
    }
  };

  return (
    <div className="md:pl-[210px] lg:pl-[270px] pt-4 px-4 lg:pt-6">
      <p className="text-2xl font-semibold mb-6">Add Product</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-5 max-w-lg"
      >
        {/* Image */}
        <div className="flex flex-col">
          <label htmlFor="doc-img" className='w-32 h-32 border border-amber-600  bg-white py-1 px-1'>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                className="w-full h-full object-cover"
                alt="Product"
              />
            )}
          </label>
          <input
            type="file"
            id="doc-img"
            onChange={handleImageChange} // Call the handler
            hidden
          />
        </div>
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows="3"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Category</label>
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct
