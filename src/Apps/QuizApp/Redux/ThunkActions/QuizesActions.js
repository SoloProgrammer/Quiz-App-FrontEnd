import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Helpers/api";

export const getQuizes = createAsyncThunk('getQuizes', async (params, { rejectWithValue }) => {
    try {
        let res = await fetch(api.quiesAPI());
        let { data } = await res.json()

        return data;
        
    } catch (error) {
        return rejectWithValue(error.response.data.badMsg)
    }
})