import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './Slices/CartSlice'
import ProductsReducer from './Slices/ProductsSlice'

const store = configureStore({
    reducer:{
        cart:CartReducer,
        products:ProductsReducer,
    }
}) 

export default store