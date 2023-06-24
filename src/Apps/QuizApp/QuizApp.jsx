import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './QuizApp.css'
import NotAllowed from './components/NotAllowed/NotAllowed'
import Submitted from './components/Submitted/Submitted'
import { useDispatch, useSelector } from 'react-redux'
import Quiz from './pages/Quiz'
import Header from './components/Header/Header'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile'
import { getUser } from './Redux/ThunkActions/UserActions'
import RestrictedRoute from './Routes/RestrictedRoute'

const WebFormApp = () => {

    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.user)

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token && !user) {
            dispatch(getUser())
        }
    }, [dispatch])

    return (
        <>
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/quiz/:slug/activity-not-allowed' element={<NotAllowed />} />
                <Route exact path='/quiz/:slug/submitted' element={<Submitted />} />
                <Route exact path='/quiz/:slug' element={<Quiz />} />

                <Route element={<RestrictedRoute user={user} loading={loading} />}>
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/sign-up' element={<SignUp />} />
                </Route>

                <Route exact path='/profile' element={<Profile />} />
            </Routes>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </>
    )
}

export default WebFormApp
