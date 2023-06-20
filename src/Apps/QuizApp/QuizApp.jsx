import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './QuizApp.css'
import { getUser } from './Helpers/AsyncCalls'
import NotAllowed from './components/NotAllowed/NotAllowed'
import Submitted from './components/Submitted/Submitted'
// import { setUser } from './Redux/Slices/UserSlice'
import { useDispatch } from 'react-redux'
import Quiz from './pages/Quiz'
import Header from './components/Header/Header'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const WebFormApp = () => {
    const [loading, setloading] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            setloading(true)
            getUser(token).then(data => {
                // dispatch(setUser(data.user))
                setloading(false)
            })
        }
        else setloading(false)
    }, [dispatch])

    return (
        <> 
           <Header/>
            <Routes>
                <Route exact path='/' element={<Home loading={loading} />} />
                <Route exact path='/activity-not-allowed' element={<NotAllowed />} />
                <Route exact path='/submitted' element={<Submitted />} />
                <Route exact path='/quiz/:slug' element={<Quiz/>} />
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/sign-up' element={<SignUp/>} />
            </Routes>
        </>
    )
}

export default WebFormApp
