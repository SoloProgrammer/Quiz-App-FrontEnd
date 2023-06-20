import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, authHeaders } from "../../Helpers/api";
import { handleRemoveToken } from "../../Helpers/AsyncCalls";

export const GetQuestionnaire = createAsyncThunk('getQuestionnaire', async (Qid, { rejectWithValue }) => {

    try {
        let res = await fetch(api.questionnaireAPI(Qid),{
            headers:authHeaders()
        })

        if(res.status === 401) return handleRemoveToken()

        let json = await res.json()

        return json.questionnaire;

    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

