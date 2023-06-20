import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizes } from '../../Redux/ThunkActions/QuizesActions'
// import { quizes } from '../../Data/quizes'
import QuizSkeletonLoading from '../Loadings/QuizSkeletonLoading'
import QuizCard from './QuizCard'

import 'react-loading-skeleton/dist/skeleton.css'


const QuizesList = () => {

    let navigate = useNavigate()

    let dispatch = useDispatch();

    const { quizes, loading } = useSelector(state => state.quizes)

    const handleTakeQuiz = (quiz) => {
        navigate(`/quiz/${quiz.slug}`, { state: quiz })
    }

    useEffect(() => {
        !quizes && dispatch(getQuizes())
        // eslint-disable-next-line
    }, [dispatch])

    return (
        <section id='exploreQuizes' className={`bg-white mt-4 f-roboto mx-2 lg:mx-10 rounded-md mb-9 pb-8`}>
            <h3 className='text-2xl p-4 lg:text-3xl text-blue-600 my-3 text-left'>Explore Quizes</h3>
            <div className="quizes flex flex-wrap gap-5 lg:gap-10 justify-center">
                {
                    loading
                        ?
                        <QuizSkeletonLoading />
                        :
                        quizes?.map((quiz, i) => {
                            return <QuizCard key={i} handleTakeQuiz={handleTakeQuiz} quiz={quiz} />
                        })
                }
            </div>
        </section>
    )
}

export default QuizesList
