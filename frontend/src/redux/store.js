// store.js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";
import productSlice from "./features/productSlice.js";

const store = configureStore({
  reducer: {
    users: userSlice,
    products: productSlice
  },
});

export default store;
