import React from 'react'
import {appIcon} from '../../Icons_Images/Icons'

const AppLogo = ({ iconW = 10, textColor = "purple", textSizeMob = "xl", textSizeDesk = "2xl" }) => {
    return (
        <div className="bg-white logoDiv flex items-center gap-4 shadow-bold w-fit p-2 pr-4 rounded-full">
            <img className={`w-${iconW} lg:w-${iconW + 4}`} src={appIcon} alt="" />
            <span className={`text-${textSizeMob} lg:text-${textSizeDesk} tracking-widest text-${textColor}-700 bold`}>TechQuiz</span>
        </div>
    )
}

export default AppLogo
