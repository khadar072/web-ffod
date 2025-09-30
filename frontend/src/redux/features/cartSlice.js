import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  orders: [],   // store placed orders
  myOrders: [],   
  status: "idle",
  error: null,
};

// place order
export const addOrder = createAsyncThunk(
  "order/add",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_URL}/user/api/order`, orderData, {
        headers: { 
          token
         },
      });
      return res.data.order;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const getMyOrder = createAsyncThunk(
  "my-order/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/user/api/my-order`, {
        headers: { 
          token
         },
      });
      return res.data.myfood;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const { productId } = action.payload;
      const found = state.cart.find((i) => i.productId === productId);
      if (found) {
        found.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateQty: (state, action) => {
      const { index, quantity } = action.payload;
      if (quantity < 1) return;
      state.cart[index].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeAt: (state, action) => {
      state.cart.splice(action.payload, 1);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload); // save placed order
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      .addCase(getMyOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMyOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myOrders=action.payload; // save placed order
      })
      .addCase(getMyOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { addCart, updateQty, removeAt, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
