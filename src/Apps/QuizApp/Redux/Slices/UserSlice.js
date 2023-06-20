import { createSlice } from "@reduxjs/toolkit";
import { CreateUser } from "../ThunkActions/UserActions";

const UserSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        clearEror: (state) => {
            state.error = null
        },
        setUser: (state, { payload }) => {
            state.user = payload
        }
    },
    extraReducers: {
        [CreateUser.pending]: (state) => {
            state.loading = true
        },
        [CreateUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload.user
        },
        [CreateUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        }
    }
})

export const { setUser } = UserSlice.actions
export default UserSlice.reducer

