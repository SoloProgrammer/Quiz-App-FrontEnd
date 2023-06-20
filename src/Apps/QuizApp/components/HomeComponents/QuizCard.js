import React from 'react'

const QuizCard = ({ quiz, handleTakeQuiz }) => {
    return (
        <div className="singleQuiz w-5/12 lg:w-60 flex flex-col justify-center items-center gap-4 shadow-md py-5 px-3 rounded-md">
            <div className="quizIcon w-24 h-24 lg:w-28 lg:h-28">
                <img className='w-full h-full object-contain' src={quiz.img} alt="" />
            </div>
            <p className='text-2xl text-gray-700'>{quiz.techs.join(" + ")}</p>
            <p className='flex w-full gap-2 items-center opacity-50'>
                <img className='w-4' src="https://cdn-icons-png.flaticon.com/512/992/992700.png" alt="time_limit" />
                <p className='text-sm mt-1'>{quiz.timeLimit.minutes} minutes</p>
            </p>
            <p className='flex text-sm justify-start w-full'>Not attempted</p>
            <button onClick={() => handleTakeQuiz(quiz)} className='py-2 px-7 !w-full mt-5 bg-purple-500 rounded-md hover:bg-purple-600 text-white md:text-lg lg:text-xl'>Take Quiz</button>
        </div>
    )
}

export default QuizCard
