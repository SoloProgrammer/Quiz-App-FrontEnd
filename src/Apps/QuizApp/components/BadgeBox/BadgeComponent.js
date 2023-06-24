import React, { useEffect } from 'react'
import { badges, partyPopGif } from '../../Icons_Images/Icons'
import { Button } from '@mui/material'

const BadgeComponent = ({ badge }) => {

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.badgeBoxBackdrop')?.classList.remove('opacity-0')
            document.querySelector('.badgeBoxBackdrop')?.classList.remove('invisible')
        }, 1000);
        setTimeout(() => {
            document.querySelector('.badgeBox')?.classList.remove('scale-0')
        }, 1500);
    }, []) 

    const hideBadgeBox = () =>{
        document.querySelector('.badgeBoxBackdrop')?.classList.add('opacity-0')
        document.querySelector('.badgeBoxBackdrop')?.classList.add('invisible')
        document.querySelector('.badgeBox')?.classList.add('scale-0')
    }
    return (
        <div style={{ background: 'rgba(0,0,0,.2)' }} className='transition-all invisible fixed !h-full !w-screen flex justify-center top-0 items-center z-10 opacity-0 badgeBoxBackdrop'>
            <div className='transition-all badgeBox w-[97%] scale-0 origin-center !py-3 px-0 md:w-fit bg-white flex flex-col gap-5 md:px-28 md:py-6 h-fit justify-center items-center shadow-md rounded-md'>
                <p className='text-xl flex gap-5 md:gap-10 items-center'>
                    <img style={{ transform: "rotateY(180deg)" }} className='w-10' src={partyPopGif} alt="" />
                    <span>CONGRATULATIONS</span>
                    <img className='w-10' src={partyPopGif} alt="" /></p>
                <p className='text-gray-600 roboto'>" You earn a <span className='px-5 py-1 rounded-full bg-gray-200 !text-black text-sm font-medium'>{badge}</span> bagde "</p>
                <div className="badgeImg my-6">
                    <img className='!w-36' src={badges[badge]} alt="" />
                </div>
                <Button onClick={hideBadgeBox} className='!bg-gray-100 !px-10 hover:!bg-gray-200 !capitalize'>Close</Button>
            </div>
        </div>
    )
}

export default BadgeComponent
