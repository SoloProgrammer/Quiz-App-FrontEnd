import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const RestrictedRoute = ({ user, loading }) => {
  let token = localStorage.getItem('token')
  if (token) {
    return <Navigate to={'/'}/>
  }
  else {
    return (
      <Outlet />
    )
  }
}

export default RestrictedRoute
