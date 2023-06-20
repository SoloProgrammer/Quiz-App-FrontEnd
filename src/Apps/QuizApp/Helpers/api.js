import { server } from "../Data/Server"

export const api = {
    userAPI: `${server.URL.local}/api/user`,
    questionnaireAPI: (questionnaire_id) => `${server.URL.local}/api/test/questionnaire/${questionnaire_id}`,
    quiesAPI: () => `${server.URL.local}/api/test/quizes`,
    quizAPI: (slug) => `${server.URL.local}/api/test/quiz/${slug}`
}

export const authHeaders = () => {
    return {
        'Content-Type': "application/json",
        token: localStorage.getItem('token')
    }
}

export const JSONheaders = {
    "Content-Type": "application/json"
}