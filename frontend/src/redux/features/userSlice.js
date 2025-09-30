import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

const initialState = {
  data: [],
  product:[],
  status: 'idle',
  error: null,
  auth: null
}

export const userRegister = createAsyncThunk('user/register', async (newUser) => {
  const res = await axios.post(`${API_URL}/user/api/user-register`, newUser);
  return res.data;
});
export const checkout = createAsyncThunk('user/checkout', async (newUser) => {
  const res = await axios.post(`${API_URL}/user/api/checkout`, newUser);
  return res.data;
});

export const userLogin = createAsyncThunk('user/login', async (newUser) => {
  const res = await axios.post(`${API_URL}/user/api/user-login`, newUser);
  const token = res.data.token
  localStorage.setItem('token', token)
  return res.data;
});
const token = localStorage.getItem('token')

export const getProduct = createAsyncThunk('get/product', async () => {
  const res = await axios.get(`${API_URL}/user/api/get-foot`, {
    Headers: {
      token
    }
  });
  return res.data.foot;
});
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.auth = null; // clear redux auth
      localStorage.removeItem('token'); // clear localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data.push(action.payload)
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.error = action.error.message
      })


      .addCase(userLogin.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.auth = action.payload
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.error.message
      })


      .addCase(getProduct.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.product= action.payload
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})
export const { logout } = userSlice.actions
export default userSlice.reducer

