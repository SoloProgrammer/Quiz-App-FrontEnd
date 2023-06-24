import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { JSONheaders, api, authHeaders } from "../../Helpers/api";

export const CreateUser = createAsyncThunk('createUser', async (credentials, { rejectWithValue }) => {

    try {
        console.log("started")
        let body = { ...credentials }
        let headers = JSONheaders
        let { data } = await axios.post(api.userAPI, body, headers)

        localStorage.setItem('token', data.token)

        return { user: data.newUser, successMsg: data.message }

    } catch (error) {
        return rejectWithValue(error.response.data.badMsg)
    }
})

export const authenticateUser = createAsyncThunk('authUser', async (credentials, { rejectWithValue }) => {

    try {

        console.log("iysfgiy");
        const body = { ...credentials }
        const headers = JSONheaders

        const { data } = await axios.post(api.userAuthApi(), body, headers);

        localStorage.setItem('token', data.token)

        return { user: data.user, successMsg: data.message }

    } catch (error) {
        return rejectWithValue(error.response.data.badMsg)
    }

})

export const getUser = createAsyncThunk('getUser', async (params, { rejectWithValue }) => {
    try {
        const headers = authHeaders()
        const { data } = await axios.get(api.userAPI, { headers })
        return data.user
    } catch (error) {
        rejectWithValue(error.response.data.message)
    }
})
