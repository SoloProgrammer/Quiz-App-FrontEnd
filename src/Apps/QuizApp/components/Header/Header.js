import React from 'react'
import AppLogo from '../AppLogo/AppLogo'
import { Link } from 'react-router-dom'
import './Header.css'
import { defaultAvatarImg } from '../../Icons_Images/staticImages'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import useLogout from '../../Hooks/useLogout'

const Header = () => {
    const { user, loading } = useSelector(state => state.user)
    const [logout] = useLogout()

    let previousScrollVal = window.pageYOffset
    const header = document.querySelector('.header')
    window.addEventListener('scroll', (e) => {

        let currScrollVal = window.pageYOffset;

        if (header) {
            if (currScrollVal > previousScrollVal) header.style.top = '-200px'
            else header.style.top = '0px'
        }

        previousScrollVal = currScrollVal
    })

    return (
        <div className='py-4 w-full header shadow-md sticky top-0 flex justify-between px-2 backdrop-blur-lg f-roboto items-center z-10'>
            <div>
                <Link to="/"><AppLogo iconW={6} textColor={"white"} textSizeDesk={"lg"} textSizeMob={"lg"} /></Link>
            </div>
            <div className='flex profile_icon gap-3 relative'>
                <div className={`p-1 cursor-pointer ${loading ? "!pt-[.1rem]" : ""} rounded-full overflow-hidden bg-white shadow-[inset_0px_0px_2px_rgba(0,0,0,0.5)] flex items-center gap-2`}>
                    {
                        loading
                            ?
                            <>
                                <Skeleton className='!rounded-full !w-11 !h-11 !mt-[-10px]' />
                            </>
                            :
                            <img className='rounded-full w-11 h-11 object-cover' src={user ? user.avatar : defaultAvatarImg} alt="" />
                    }
                </div>
                <div className='proflileHoverBox shadow-md text-left rounded-md !w-44'>
                    {
                        loading
                            ?
                            <div className='w-full px-2'>
                                <Skeleton className='w-full h-10' />
                                <Skeleton className='w-full h-10' />
                            </div>
                            :
                            <>
                                {user && <p className='text-sm text-gray-500 mb-1 pt-1 pb-2  text-center border-b-2 border-gray-200'>{user?.name.length >= 20 ? user?.name.slice(0, 20) + "..." : user?.name}</p>}
                                {
                                    !user ?
                                        <>
                                            <Link to="/login">
                                                <div className='hover:text-black flex gap-2'>
                                                    <span>Login</span>
                                                </div>
                                            </Link>
                                            <Link to="/sign-up">
                                                <div className='hover:text-black flex gap-2'>
                                                    <span>SignUp</span>
                                                </div>
                                            </Link>
                                        </>
                                        :
                                        <>
                                            <Link to="/profile">
                                                <div className='hover:text-black flex gap-2'>
                                                    <span>My Profile</span>
                                                </div>
                                            </Link>
                                            <Link >
                                                <div onClick={logout} className='flex gap-2 !text-gray-400'>
                                                    <span>Logout</span>
                                                </div>
                                            </Link>
                                        </>
                                }
                            </>

                    }

                </div>

            </div>
        </div>
    )
}

export default Header
