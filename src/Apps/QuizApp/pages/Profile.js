import { Button, Chip } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector(state => state.user)
  return (
    <div className='f-roboto mt-10'>
      <div className='w-full flex gap-2 px-28 items-center justify-center mb-10'>
        <div className="rightSideLobby w-fit bg-white flex px-16 py-5 gap-5 flex-col">
          <div className='flex items-center flex-col'>
            <div className='w-64 h-64 rounded-full overflow-hidden'>
              <img className='h-full w-full object-cover' src={user?.avatar} alt="avatar" />
            </div>
            <div className='my-5'>
              <p className='text-2xl bold mt-1 text-gray-600'>{user?.name}</p>
              <p className='bold text-gray-400 text-sm'>{user?.email}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 justify-start items-start '>
            <p>Your Tech Interests</p>
            <div className='flex gap-2 items-center mb-5'>
              {
                user?.techInt.map((item, i) => {
                  return <Chip key={i} label={item} variant="outlined" size='small' />
                })
              }
            </div>
          </div>
          <div className='flex flex-col gap-2 justify-start items-start '>
            <div>
              Total Quizes attempted:  <span>{user?.score.length ? user?.score.length : 0}</span>
            </div>
            <div>
              Total badges Earn:  <span>{user?.badges.length}</span>
            </div>
            <div>
              Total Score:  <span>{user?.score.length ? user?.score.reduce((accum, item) => {
                accum += Object.values(item)[0]
                return accum
              }, 0) : 0}</span>
            </div>
          </div>
          <div className='flex gap-4'>
            <Button className='!bg-gray-100 !px-10 hover:!bg-gray-200'>Change password</Button>
            <Button className='!bg-gray-100 !px-10 hover:!bg-gray-200'>Update Profile</Button>
          </div>
        </div>
        <div className="leftSideLobby flex flex-col gap-2">
          <div className='bg-white w-[40rem] h-80'>

          </div>
          <div className='bg-white w-[40rem] h-80'>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile
