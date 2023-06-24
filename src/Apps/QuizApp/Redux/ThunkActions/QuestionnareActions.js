import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, authHeaders } from "../../Helpers/api";
import axios from "axios";

export const GetQuestionnaire = createAsyncThunk('getQuestionnaire', async (Qid, { rejectWithValue }) => {

    try {
        const headers = authHeaders()
    
        let { data } = await axios.get(api.questionnaireAPI(Qid), { headers })

        return data.questions

    } catch (error) {
        // if(error.response.status === 401) handleRemoveToken()
        // console.log(error);
        rejectWithValue(error.response.data.message)
    }
})

