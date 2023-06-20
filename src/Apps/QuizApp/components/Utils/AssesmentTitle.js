import React from 'react'
import { JsIcon, reactIcon } from '../../Icons_Images/Icons'

const AssesmentTitle = ({textwidth1,textwidth2}) => {
    return (
        <>
            <h3 className={`${textwidth1 || 'text-2xl'} font-medium pb-2 justify-center md:${textwidth2 || 'text-3xl'}`}>Assesment of React <span className='px-2 '><img className='inline mb-1' width={30} src={reactIcon} alt="react" /></span> & Javascript <span className='px-2'><img className='inline mb-1' width={30} src={JsIcon} alt="" /></span> skills</h3>
        </>
    )
}

export default AssesmentTitle
