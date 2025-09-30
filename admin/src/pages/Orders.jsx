import React from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import images from "../assets/images.jpg";
import { listOrder } from '../redux/features/productSlice'
import axios from 'axios';
const Orders = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const atoken = localStorage.getItem('atoken')
  const {list} = useSelector((state)=> state.products)
  const dispatch = useDispatch()
 

  useEffect(()=>{
    dispatch(listOrder())
  },[dispatch])


  const handleChange = async (e, orderId) => {
    try {
      const newStatus = e.target.value;
      const res = await axios.post(
        API_URL + "/admin/api/update-status",
        { orderId, status: newStatus },
        {
          headers: {
            atoken,
          },
        }
      );

      if (res.data.success) {
        dispatch(listOrder()); // refresh orders
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h2>

      {!list || list.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders yet.</p>
      ) : (
        list.map((order) => (
          <div
            key={order._id}
            className="flex flex-col sm:flex-row items-start sm:items-start justify-between border rounded-lg p-4 mb-4 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={images}
              alt="Order"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mr-4 mb-4 sm:mb-0"
            />
          <div className=' flex flex-col gap-4'>
              <p className="text-gray-700 mb-2 font-medium flex item-start break-words w-[300px]">
                {order.items
                  .map((item) => `${item.name} x${item.quantity}`)
                  .join(", ")}
              </p>
              
                <div>
                <p>{order.name}</p>
                <p>{order.phone}</p>
                <p>{order.address}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-1">
                <strong>Amount:</strong> ${order.amount}.00
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Items:</strong> {order.items.length}
              </p>
            
             <select onChange={(e)=>handleChange(e,order._id)} value={order.status} className='border border-gray-300' name="" id="">
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
             </select>
           
          </div>
        ))
      )}
    </div>
  )
}

export default Orders
