import { createSlice } from '@reduxjs/toolkit'

export const freeShippingCost = 3000;
export const ShippingCost = 100;

const CartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, { payload }) {
            state.unshift({ ...payload, qty: 1 })
        },
        removeFromCart(state, { payload }) {
            return state.filter(p => p.id !== payload)
        },
        ChangeQuantity(state, { payload }) {
            let filteredItem = state.filter(i => i.id === payload.id)
            let newItem = {...filteredItem[0]}
            newItem.qty = payload.qty
            return state.map(i => {
                if (i.id === payload.id) {
                    i = newItem
                }
                return i
            })
        }
    }
})

export const { addToCart, removeFromCart, ChangeQuantity } = CartSlice.actions

export default CartSlice.reducer