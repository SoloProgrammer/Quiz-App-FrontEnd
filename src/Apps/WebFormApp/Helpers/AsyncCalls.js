export const getUser = async (token) => {
    const res = await fetch('http://localhost:8080/api/user', {
        headers: { token }
    });

    let json = await res.json()
    if (!json.status || json.status === '401') localStorage.removeItem('token')
    return json
}

export const createtUser = async (name, email) => {
    const res = await fetch('http://localhost:8080/api/user', {
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

export const submitTest = async (score) => {
    const res = await fetch('http://localhost:8080/api/user/submit', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem('token')
        },
        body: JSON.stringify({ score })
    });

    let json = await res.json()
    if (!json.status || json.status === '401') {
        localStorage.removeItem('token')
        return false
    }

    return true
}