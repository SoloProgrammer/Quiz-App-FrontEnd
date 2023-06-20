import React from 'react'
import { badgeIcon, rankingIcon, skillsUPIcon } from '../../Icons_Images/Icons'

const Benifits = () => {
    return (
        <section className='benifits_section bg-white mt-4 f-roboto p-4 mx-2 lg:mx-10 rounded-md mb-4'>
            <h3 className='text-2xl lg:text-3xl text-blue-600 my-3 text-left'>Benifits</h3>
            <div className='flex justify-around flex-wrap gap-5'>
                <div className="div1 flex flex-col items-center justify-center gap-6 p-5 shadow-md rounded-md w-full md:w-52 lg:w-60 benifitDiv">
                    <img className='w-28 lg:w-36' src={skillsUPIcon} alt="" />
                    <h3 className='text-xl text-gray-700'>Up your tech skills</h3>
                </div>
                <div className="div2 flex flex-col items-center justify-center gap-6 p-5 shadow-md rounded-md w-full md:w-52 lg:w-60 benifitDiv">
                    <img className='w-28 lg:w-36' src={badgeIcon} alt="" />
                    <h3 className='text-xl text-gray-700'>Earn a badge</h3>
                </div>
                <div className="div3 flex flex-col items-center justify-center gap-6 p-5 shadow-md rounded-md w-full md:w-52 lg:w-60 benifitDiv">
                    <img className='w-24 lg:w-36' src={rankingIcon} alt="" />
                    <h3 className='text-xl text-gray-700'>Get a rank with your total score</h3>
                </div>
            </div>
        </section>
    )
}

export default Benifits
