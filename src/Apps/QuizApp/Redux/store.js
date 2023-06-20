import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './Slices/UserSlice'
import QuestionnaireSlice from './Slices/QuestionnaireSlice'
import QuizesSlice from './Slices/QuizesSlice'

const store = configureStore({
    reducer:{
        user:UserReducer,
        questionnaire:QuestionnaireSlice,
        quizes:QuizesSlice
    }
})

export default store