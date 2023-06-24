import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { accessDeniedImg } from '../../Icons_Images/Icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NotAllowed = () => {
    const { slug } = useParams()
    const { user } = useSelector(state => state.user)
    const { quiz } = useSelector(state => state.quizes)
    const navigate = useNavigate()
    useEffect(() => {
        if(quiz?.slug !== slug) navigate('/')
    }, [])
    return (
        user
        &&
        <Container maxWidth="xl" className='StartTestContainer p-0' sx={{ display: 'flex', justifyContent: "center" }}>
            <div className='bg-white py-3 px-1 md:px-16 mt-2 pt-8 shadow-lg rounded-sm'>
                <div className='flex items-center flex-col gap-1'>
                    <h3 className='text-red-600 font-semibold text-xl'>ACCESS DENIED</h3>
                    <img className='w-24' src={accessDeniedImg} alt="access denied" />
                </div>
                <div className='mt-3'>
                   The quiz was blocked for your account!
                </div>
                <div className='text-xs font-bold my-5 text-center'>
                    <p className='text-red-500 bg-purple-100 px-1 w-fit'>As you attempt to re-start the test manually by reloading/refreshing the page or by doing some non-permitted activities!</p>
                    <p className='text-gray-500 mt-1 text-sm md:text-lg'>Which is why from now itself we have disbaled your account permananetly for the test</p>
                </div>
                <Link to={'/'}>HOME</Link>
            </div>
        </Container>
    )
}

export default NotAllowed
