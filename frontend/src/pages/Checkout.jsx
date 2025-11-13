import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, clearCart } from "../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart: items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = { ...form, items };

    dispatch(addOrder(orderData))
      .unwrap()
      .then((res) => {
        console.log("Saved Order from DB:", res);
        dispatch(clearCart());
        alert("Order placed successfully!");
        setForm({ name: "", email: "", address: "", phone: "" });
        navigate("/my-order");
      })
      .catch((err) => {
        console.error("Order error:", err);
        alert("Failed to place order");
      });
  };

  return (
    <div className="py-6">
      {/* Form Part */}
      <form
        onSubmit={handlePlaceOrder}
        className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
      >
        {/* Shipping Details */}
        <div className="bg-white shadow-md rounded-2xl p-6 space-y-5">
          <h2 className="text-2xl font-bold text-amber-500">Shipping Details</h2>
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-amber-400"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-amber-400"
            />
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-amber-400"
            ></textarea>
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-amber-400"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-amber-500 mb-4">Order Summary</h2>
          <ul className="space-y-3">
            {items.map((i, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{i.name}</p>
                  <p className="text-sm text-gray-500">
                    {i.quantity} × ${i.price}
                  </p>
                </div>
                <p className="text-amber-600 font-semibold">
                  ${(i.price * i.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="font-semibold">Delivery</p>
            <p className="font-semibold text-amber-600">$0.00</p>
          </div>
          <div className="mt-6 flex justify-between items-center text-lg font-bold">
            <p>Total</p>
            <p className="text-amber-600">${total.toFixed(2)}</p>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
