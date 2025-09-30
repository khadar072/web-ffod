import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const initialState = { 
    data: [],
    product:null,
    list:[],
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

export const getSingleProduct = createAsyncThunk('getsingle/product', async (id) =>{
   
    const res = await axios.get(API_URL + `/admin/api/get-single-product/${id}`,{ 
        headers:{
            atoken
        }
    })
    return res.data.product
})

export const deleteProduct = createAsyncThunk('delete/product', async (id) =>{
   
    const res = await axios.delete(API_URL + `/admin/api/delete-product/${id}`,{ 
        headers:{
            atoken
        }
    })
    return res.data.product
})

export const updateSingleProduct = createAsyncThunk(
  'update/product',
  async ({ id, formdata }) => {
    const res = await axios.put(
      `${API_URL}/admin/api/update-product/${id}`,
      formdata,
      {
        headers: {
          atoken,
        },
      }
    );
    return res.data.updatedproduct;
  }
);


export const listOrder = createAsyncThunk('list/order', async (id) =>{
   
    const res = await axios.get(API_URL + '/admin/api/list-order',{ 
        headers:{
            atoken
        }
    })
    return res.data.listFood
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

         .addCase(getSingleProduct.pending,(state) =>{
            state.status = 'loading'
        })
        .addCase(getSingleProduct.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.product =action.payload
        })
        .addCase(getSingleProduct.rejected,(state,action) =>{
            state.status = 'failed'
            state.error = action.error.message
        })


        .addCase(updateSingleProduct.pending,(state) =>{
            state.status = 'loading'
        })
        .addCase(updateSingleProduct.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.product =action.payload

            const index = state.data.findIndex(p => p._id === action.payload._id)
            if (index !== -1) {
                state.data[index] = action.payload
            }
        })
        .addCase(updateSingleProduct.rejected,(state,action) =>{
            state.status = 'failed'
            state.error = action.error.message
        })

        .addCase(deleteProduct.pending,(state) =>{
            state.status = 'loading'
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = state.data.filter(p => p._id !== action.meta.arg) 
        })
        .addCase(deleteProduct.rejected,(state,action) =>{
            state.status = 'failed'
            state.error = action.error.message
        })

        .addCase(listOrder.pending,(state) =>{
            state.status = 'loading'
        })
        .addCase(listOrder.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.list = action.payload
        })
        .addCase(listOrder.rejected,(state,action) =>{
            state.status = 'failed'
            state.error = action.error.message
        })
  },
})

export const { logout } = productSlice.actions;
export default productSlice.reducer