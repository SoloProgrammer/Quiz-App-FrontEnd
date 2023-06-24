import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const {user} = useSelector(state => state.user)
  return (
    <div className='f-roboto'>
       <p className='text-4xl my-4 px-3 py2 text-gray-500'> Welcome {user?.name} to your lobby 💪</p>
       <div className='w-screen flex gap-2 px-3'>
         <div className="rightSideLobby w-1/2 h-52 bg-white">

         </div>
         <div className="leftSideLobby w-1/2 h-52 bg-white">

         </div>
       </div>
    </div>
  )
}

export default Profile
