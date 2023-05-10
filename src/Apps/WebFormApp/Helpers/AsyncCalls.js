import { server } from "../Data/Server";

function handleRemoveToken() {
    localStorage.removeItem('token')
    window.location.reload(0)
}

export const getUser = async (token) => {
    const res = await fetch(`${server.URL.local}/api/user`, {
        headers: { token }
    });

    if (res.status === 401) handleRemoveToken()

    let json = await res.json()
    return json
}

export const createtUser = async (name, email) => {
    const res = await fetch(`${server.URL.local}/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
    });

    let json = await res.json()
    if (!json.status) return json

    localStorage.setItem('token', json.token);

    return json
}

export const submitTest = async (selectedOptions) => {
    const res = await fetch(`${server.URL.local}/api/test/submit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem('token')
        },
        body: JSON.stringify({ selectedOptionsbyQue: selectedOptions })
    });

    if (res.status === 401) handleRemoveToken()

    let json = await res.json()

    if (!json.status) {
        localStorage.removeItem('token')
        return false
    }

    return json.score
}

export const getQuestionnaire = async () => {
    const res = await fetch(`${server.URL.local}/api/test/questions`, {
        headers: {
            token: localStorage.getItem('token')
        }
    });

    if (res.status === 401) handleRemoveToken()

    const json = await res.json();

    return json.questionnaire
}

export const putComment = async (qId, comment) => {
    const res = await fetch(`${server.URL.local}/api/test/question/${qId}/comment`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem('token')
        },
        body: JSON.stringify({ comment })
    });

    if (res.status === 401) handleRemoveToken()

    let json = await res.json()
    if (json.status) return json.updatedQuestionnaire;
    else return false
}