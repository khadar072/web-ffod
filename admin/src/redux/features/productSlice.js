import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const initialState = { 
    data: [],
    auth:null,
    status: 'idle',
    error : null
}

const atoken = localStorage.getItem('atoken')

export const addProduct = createAsyncThunk('product/add-product', async(formdata)=>{
    const res = await axios.post(API_URL+'/admin/api/add-product' ,formdata,{
        headers: {
            atoken,
          },
    });
        return res.data
})

export const getProducts = createAsyncThunk('get/products', async() => {
    const res = await axios.get(API_URL +'/admin/api/get-product',{
        headers: {
            atoken,
          },
    });
    return res.data.products
})

export const adminLogin = createAsyncThunk('admin/login', async (login) =>{
    const res = await axios.post(API_URL + "/admin/api/admin-login",login,)
    const atoken = res.data.atoken;
    localStorage.setItem('atoken', atoken);
    return res.data
})

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   logout: (state) => {
      state.auth = null; // clear redux auth
      localStorage.removeItem('atoken'); // clear localStorage
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(addProduct.pending,(state) =>{
            state.status = 'loading'
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data.push(action.payload)
        })
        .addCase(addProduct.rejected,(state,action) =>{
            state.status = 'failed'
            state.error = action.error.message
        })

        .addCase(getProducts.pending,(state) =>{
            state.status = 'loading'
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        })
        .addCase(getProducts.rejected,(state,action) =>{
            state.status = 'failed'
            state.error = action.error.message
        })

        .addCase(adminLogin.pending,(state) =>{
            state.status = 'loading'
        })
        .addCase(adminLogin.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.auth =action.payload
        })
        .addCase(adminLogin.rejected,(state,action) =>{
            state.status = 'failed'
            state.error = action.error.message
        })
  },
})

export const { logout } = productSlice.actions;
export default productSlice.reducer