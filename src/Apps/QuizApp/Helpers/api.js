import { server } from "../Data/Server"

export const api = {
    userAPI: `${server.URL.local}/api/user`,
    userAuthApi: () => `${server.URL.local}/api/user/auth`,
    questionnaireAPI: (quizId) => `${server.URL.local}/api/test/questionnaire/${quizId}`,
    quiesAPI: () => `${server.URL.local}/api/test/quizes`,
    quizAPI: (slug) => `${server.URL.local}/api/test/quiz/${slug}`
}

// return headers inside the function because when we call this fucntion it will return the current value of token from localstorage 
export const authHeaders = () => {
    return {
        'Content-Type': "application/json",
        token: localStorage.getItem('token')
    }
}

export const JSONheaders = {
    "Content-Type": "application/json"
}