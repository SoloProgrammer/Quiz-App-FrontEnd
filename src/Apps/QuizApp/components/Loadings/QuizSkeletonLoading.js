import React from 'react'
import Skeleton from 'react-loading-skeleton'

const QuizSkeletonLoading = () => {
    return (
        Array.from({ length: 10 }).map((_, i) => {
            return (
                <div key={i} className='flex gap-3 md:mb-0 flex-col !w-[45%] md:!w-[30%] lg:!w-60 !h-fit py-2 pb-4 px-3 shadow-md pt-4 rounded-md'>
                    <div className='w-full'>
                        <div className='flex items-center justify-center flex-col w-full'>
                            <Skeleton className='!w-28 h-28 md:!w-32 md:!h-32' />
                            <Skeleton className='!w-36 lg:!w-40 mt-2 h-4' />
                        </div>
                        <div className='flex justify-start items-start w-full flex-col'>
                            <Skeleton className='!w-[8rem] lg:!w-48 h-3 mt-5 !leading-3' />
                            <Skeleton className='h-2 !w-28 lg:!w-36' />
                        </div>
                        <div>
                            <Skeleton className=' h-8 md:h-10 mt-4' />
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default QuizSkeletonLoading
