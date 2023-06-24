import { createSlice } from "@reduxjs/toolkit";
import { getQuizes } from "../ThunkActions/QuizesActions";

const quizesSlice = createSlice({
    name: "quizes",
    initialState: {},
    reducers: {
        clearEror: (state) => {
            state.error = null
        },
        setQuizes: (state, { payload }) => {
            state.quizes = payload
        },
        setQuiz: (state, { payload }) => {
            state.quiz = payload
        }
    },
    extraReducers: {
        [getQuizes.pending]: (state) => {
            state.loading = true
        },
        [getQuizes.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.quizes = payload
        },
        [getQuizes.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        }
    }
})

export const { clearEror, setQuizes, setQuiz } = quizesSlice.actions;

export default quizesSlice.reducer