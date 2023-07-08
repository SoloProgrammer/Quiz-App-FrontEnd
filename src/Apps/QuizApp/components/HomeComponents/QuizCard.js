import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const QuizCard = ({ quiz, handleTakeQuiz }) => {
    const { user } = useSelector(state => state.user)

    const getRemainingdaysToRetakeQuiz = useCallback(() => {
        if (user && quiz) {

            let currDate = new Date();
            let quizAttemptedDate = new Date(user?.score.filter(sc => sc.quiz === quiz._id)[0].date)
            // let quizAttemptedDate =new Date('2023-06-22T06:14:58.144+00:00')

            // console.log(new Date(quizAttemptedDate));

            let dateAfter30d = new Date(quizAttemptedDate.setDate(quizAttemptedDate.getDate() + 30))

            // console.log(dateAfter30d, currDate);

            let timeDiff = dateAfter30d.getTime() - currDate.getTime()

            return String((Math.ceil(timeDiff / (1000 * 3600 * 24))) + 'd');

        }

    }, [user, quiz])

    return (
        <div className="singleQuiz !w-[45%] md:!w-[30%] lg:!w-60 flex flex-col justify-center items-center gap-4 shadow-md py-5 px-3 rounded-md">
            <div className="quizIcon w-24 h-24 lg:w-28 lg:h-28">
                <img className='w-full h-full object-contain' src={quiz.img} alt="" />
            </div>
            <p className='text-2xl text-gray-700'>{quiz.techs.join(" + ")}</p>
            <div className='flex w-full gap-2 items-center opacity-50'>
                <img className='w-4' src="https://cdn-icons-png.flaticon.com/512/992/992700.png" alt="time_limit" />
                <p className='text-sm mt-1'>{quiz.timeLimit.minutes} minutes</p>
            </div>
            <p className='flex text-sm w-full justify-between'>
                {
                    user?.score.map(sc => sc.quiz).includes(quiz._id)
                        ?
                        <span className='flex gap-1 items-center'>
                            <span>Attempted</span>
                            <CheckCircleIcon className='text-green-400 !text-[1.2rem]' />
                        </span>
                        :
                        "Not attempted"
                }
                {
                    user?.score.filter(sc => sc.quiz === quiz._id).length > 0
                    &&
                    <span>
                        <span>Score:</span>
                        <span>
                            {
                                user.score.filter(sc => sc.quiz === quiz._id)[0].score
                            }
                        </span>
                    </span>
                }
            </p>
            <button disabled={user?.score.map(sc => sc.quiz).includes(quiz?._id)} onClick={() => handleTakeQuiz(quiz)} className='py-2 px-7 !w-full mt-5 bg-purple-500 rounded-md hover:bg-purple-600 text-white md:text-lg lg:text-xl disabled:bg-purple-300 disabled:cursor-auto'>

                {
                    user?.score.map(sc => sc.quiz).includes(quiz?._id) ?
                        <span>Retake in {getRemainingdaysToRetakeQuiz()}</span>
                        :
                        "Take quiz"
                }
            </button>
        </div>
    )
}

export default QuizCard
