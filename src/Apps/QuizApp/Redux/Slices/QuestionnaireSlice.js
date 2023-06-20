import { createSlice } from '@reduxjs/toolkit'
import { GetQuestionnaire } from '../ThunkActions/QuestionnareActions'

const QuestionnaireSlice = createSlice({
    name: 'questionnaire',
    initialState: {},
    reducers: {
        clearEror: (state) => {
            state.error = null
        },
        setScore: (state, { payload }) => {
            state.score = payload
        },
        updateQuestionnare: (state, { payload }) => {
            state.questionnaire = payload
        }
    },
    extraReducers: {
        [GetQuestionnaire.pending]: (state) => {
            state.loading = true
        },
        [GetQuestionnaire.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.questionnaire = payload
        },
        [GetQuestionnaire.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        }
    }
})

export const { clearError, setScore, updateQuestionnare } = QuestionnaireSlice.actions;

export default QuestionnaireSlice.reducer