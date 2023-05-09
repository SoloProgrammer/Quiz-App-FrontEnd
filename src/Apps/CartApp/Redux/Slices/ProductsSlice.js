import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from '../Actions/ThunkActions'

const ProductsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
    },
    reducers: {
        clearError(state) {
            state.error = null
        }
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.isLoading = true
        },
        [fetchProducts.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.products = payload.products
            state.totalProducts = payload.total 
        },
        [fetchProducts.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        },

    }
})

export const {clearError} = ProductsSlice.actions;

export default ProductsSlice.reducer