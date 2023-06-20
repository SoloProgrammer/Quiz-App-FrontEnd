import React from 'react'
import Skeleton from 'react-loading-skeleton'

const QuizSkeletonLoading = () => {
    return (
        Array.from({ length: 5 }).map((_, i) => {
            return (
                <div key={i} className='flex gap-3 md:mb-0 flex-col w-5/12 !h-fit lg:w-60'>
                    <div>
                        <Skeleton className='w-24 h-36 lg:w-28 lg:h-44' />
                        <Skeleton className='w-full h-3 mt-2' />
                        <div className='flex justify-start w-full'>
                            <Skeleton className=' h-3 !w-32 lg:!w-40' />
                        </div>
                    </div>
                    <div>
                        <Skeleton className=' h-10 ' />
                    </div>
                </div>
            )
        })
    )
}

export default QuizSkeletonLoading
