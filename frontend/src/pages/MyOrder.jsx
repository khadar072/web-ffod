import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyOrder } from "../redux/features/cartSlice";
import images from "../assets/images.jpg";

const MyOrder = () => {
  const { myOrders, status, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrder());
  }, [dispatch]);

  if (status === "loading") return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h2>

      {!myOrders || myOrders.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders yet.</p>
      ) : (
        myOrders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col sm:flex-row items-start  justify-between border rounded-lg p-4 mb-4 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={images}
              alt="Order"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mr-4 mb-4 sm:mb-0"
            />
          
              <p className="text-gray-700 mb-2 font-medium flex item-start break-words w-[300px]">
                {order.items
                  .map((item) => `${item.name} x${item.quantity}`)
                  .join(", ")}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Amount:</strong> ${order.amount}.00
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Items:</strong> {order.items.length}
              </p>
              <p className="mb-2">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    order.status === "delivered"
                      ? "bg-green-500"
                      : order.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                ></span>
                <b className="capitalize">{order.status}</b>
              </p>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-200">
                Track Order
              </button>
           
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrder;
