import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}




export const getProduct = createAsyncThunk('get/product', async () => {
  const res = await axios.get(`${API_URL}/user/api/get-foot`);
  return res.data.foot;
});
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
   
      .addCase(getProduct.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data= action.payload
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export default productSlice.reducer

