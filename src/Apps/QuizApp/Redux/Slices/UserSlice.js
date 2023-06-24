import { createSlice } from "@reduxjs/toolkit";
import { CreateUser, authenticateUser, getUser } from "../ThunkActions/UserActions";

const UserSlice = createSlice({
    name: 'user',
    initialState: {
    },
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearSuccessMsg: (state) => {
            state.successMsg = null
        },
        setUser: (state, { payload }) => {
            state.user = payload
        }
    },
    extraReducers: {
        [getUser.pending]: (state) => {
            state.loading = true
        },
        [getUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload
        },
        [getUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        [CreateUser.pending]: (state) => {
            state.loading = true
        },
        [CreateUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload.user
            state.successMsg = payload.successMsg
        },
        [CreateUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        
        [authenticateUser.pending]: (state) => {
            state.loading = true
        },
        [authenticateUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload.user
            state.successMsg = payload.successMsg
        },
        [authenticateUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

    }
})

export const { setUser, clearError, clearSuccessMsg } = UserSlice.actions
export default UserSlice.reducer

