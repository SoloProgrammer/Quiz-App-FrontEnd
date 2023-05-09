import { Container } from '@mui/material'
import React from 'react'

const Submiited = ({user}) => {
  return (
    <Container maxWidth="xl" className='StartTestContainer p-0' sx={{ display: 'flex', justifyContent: "center" }}>
      <div className='bg-white py-3 px-1 md:px-16 mt-2 pt-8 shadow-lg rounded-sm'>
        <div className='flex items-center flex-col gap-1'>
          <h3 className='text-gray-400 font-semibold text-2xl mb-4'>ALREADY SUBMITTED</h3>
          <img className='w-14' src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" alt="" />
        </div>
        <div className='mt-3'>
          The Test have already been submitted for the account <b className='text-blue-400 font-normal roboto text-sm'>prathamshinde987@gmail.com</b>
        </div>
        <div className='text-xs font-bold my-5 text-center'>
          <p className='text-blue-700'>You are not permitted to retake the test as it has already been submitted.</p>
        </div>
      </div>
    </Container>
  )
}

export default Submiited
