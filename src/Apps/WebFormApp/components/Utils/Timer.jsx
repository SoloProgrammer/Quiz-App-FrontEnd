import React, { useEffect, useState } from 'react'

const Timer = ({ min, hours }) => {
    const [mins, setMins] = useState(min);
    const [seconds, setSeconds] = useState(0);


    const handleTime = () => {
        if (mins !== 0) {
            if (mins > 0 && seconds === 0) {
                setSeconds(59)
                setMins(mins - 1)
            } else {
                setSeconds(seconds - 1)
            }
        }
        else{
            if(seconds === 0){
                console.log("Time up")
            }
            else setSeconds(seconds - 1)
        }
    }
    useEffect(() => {

        const interval = setTimeout(() => handleTime(), 1000);

        return () => clearTimeout(interval);
        // eslint-disable-next-line 
    }, [seconds, mins]);

    return (
        <div className="timer font-sans font-semibold text-sm roboto text-gray-900">{mins >= 10 ? mins : `0${mins}`}<span className='text-gray-500'>m</span> : {seconds >= 10 ? seconds : `0${seconds}`}<span className='text-gray-500'>s</span></div>
    )
}

export default Timer
