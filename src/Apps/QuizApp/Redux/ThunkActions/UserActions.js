import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { api } from "../../Helpers/api";

export const CreateUser = createAsyncThunk('createUser', async (credentials, { rejectWithValue }) => {

    try {
        console.log("started")
        let body = { ...credentials }
        let headers = {
            "Content-Type": "application/json"
        }
        let { data } = await axios.post(api.userAPI, body, headers)

        console.log(data);

        localStorage.setItem('token', data.token)

        return { user: data.newUser, sucessMsg: data.message }

    } catch (error) {
        return rejectWithValue(error.response.data.badMsg)
    }
})