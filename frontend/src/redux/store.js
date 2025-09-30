// store.js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";
import productSlice from "./features/productSlice.js";
import cartSlice from './features/cartSlice.js'
const store = configureStore({
  reducer: {
    users: userSlice,
    products: productSlice,
    cart:cartSlice
  },
});

export default store;
