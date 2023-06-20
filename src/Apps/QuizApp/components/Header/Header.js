import React from 'react'
import AppLogo from '../AppLogo/AppLogo'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <div className='py-4 w-full shadow-md sticky top-0 flex justify-between px-2 backdrop-blur-lg f-roboto items-center z-10'>
            <div>
                <Link to="/"><AppLogo iconW={8} textColor={"white"} textSizeDesk={"xl"} textSizeMob={"lg"} /></Link>
            </div>
            <div className='flex profile_icon gap-3 relative'>
                <div className='p-1 cursor-pointer  rounded-full overflow-hidden bg-white shadow-[inset_0px_0px_2px_rgba(0,0,0,0.5)] flex items-center gap-2'>
                    <img className='rounded-full w-12 h-12 object-cover' src="https://res.cloudinary.com/dvzjzf36i/image/upload/v1679814483/wxrvucwq93ovrswfpsk3.png" alt="" />
                    {/* Pratham */}
                </div>
                <div className='proflileHoverBox shadow-md text-left rounded-md'>
                    <Link to="/login">
                        <p className='hover:text-black flex gap-2'>
                            {/* <img className="w-7 opacity-40" src="https://res.cloudinary.com/dvzjzf36i/image/upload/v1679814483/wxrvucwq93ovrswfpsk3.png" alt="" /> */}
                            <span>Login</span>
                        </p>
                    </Link>
                    <Link to="/sign-up">
                        <p className='hover:text-black flex gap-2'>
                            {/* <img className="w-7 opacity-40" src="https://cdn-icons-png.flaticon.com/512/9633/9633868.png" alt="" /> */}
                            <span>SignUp</span>
                        </p>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Header
