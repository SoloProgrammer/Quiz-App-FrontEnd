import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchProducts = createAsyncThunk('getProducts', async (FetchParams, { rejectWithValue }) => {
    try {
        const { page, LimitPerPage } = FetchParams
        let skip = page*LimitPerPage - LimitPerPage
        const { data } = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${LimitPerPage}`);
        return data;
    } catch (error) {
        rejectWithValue(error.response.data.message)
    }
})