import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './QuizApp.css'
import { getUser } from './Helpers/AsyncCalls'
import NotAllowed from './components/NotAllowed/NotAllowed'
import Submitted from './components/Submitted/Submitted'
const WebFormApp = () => {

    const [user, setUser] = useState(null)
    const [loading,setloading] = useState(true)

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            setloading(true)
            getUser(token).then(data => {
                setUser(data.user)
                setloading(false)
            })
        }
        else setloading(false)
    }, [])

    return (
        <>
            <Routes>
                <Route exact path='/' element={<Home user={user} setUser={setUser} loading={loading}/>} />
                <Route exact path='/activity-not-allowed' element={<NotAllowed user={user}/>}/>
                <Route exact path='/submitted' element={<Submitted user={user}/>}/>
            </Routes>
        </>
    )
}

export default WebFormApp
