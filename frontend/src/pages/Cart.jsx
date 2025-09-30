import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateQty, removeAt, clearCart } from '../redux/features/cartSlice'

const Cart = () => {
  const { cart: items } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-amber-500">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-600">
          Cart is empty.{' '}
          <Link to="/" className="text-amber-500 font-semibold hover:underline">
            Shop now
          </Link>
        </p>
      ) : (
        <div className="space-y-6">
          <ul className="space-y-4">
            {items.map((i, idx) => (
              <li
                key={idx}
                className="flex flex-row items-center md:items-start gap-4 border-b pb-4 hover:shadow-md transition-shadow rounded-lg p-3"
              >
                {i.image && (
                  <img
                    src={`http://localhost:5002/upload/${i.image}`}
                    alt={i.name}
                    className="w-28 h-28  object-cover rounded-lg"
                  />
                )}
                <div className=" flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
                  <div className='w-full flex flex-col gap-6'>
                    <div>
                      <h4 className="font-semibold text-lg">{i.name}</h4>
                      <p className='text-xl font-semibold'> price : <span className="text-amber-500  px-4 font-bold mt-1">${i.price}</span></p>
                    </div>
                    <div className="flex justify-between  w-full items-center gap-3  md:mt-0">
                      <input
                        type="number"
                        min="1"
                        value={i.quantity}
                        onChange={e =>
                          dispatch(updateQty({ index: idx, quantity: Number(e.target.value) }))
                        }
                        className="w-16  border rounded px-2 py-1 text-center focus:outline-amber-400"
                      />
                      <button
                        onClick={() => dispatch(removeAt(idx))}
                        className="text-red-500 hover:text-red-600 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>


                </div>
              </li>
            ))}
          </ul>

          <div className='flex flex-row items-center justify-end w-full'>
            <div className="bg-gray-50 p-4 w-[400px] rounded-lg shadow-md flex flex-col gap-12  justify-between items-end">
              <div className='flex flex- w-full justify-between items-center'>
                <p className="text-xl font-semibold">Total:</p>
                <p className="text-amber-500">${total.toFixed(2)}</p>
              </div>
              <div className="flex flex-col w-full gap-3 mt-3 md:mt-0">
                <Link
                  to="/checkout"
                  className="w-full text-center bg-amber-500 text-white px-5 py-2 rounded hover:bg-amber-600 transition"
                >
                  Checkout
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full text-center bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
