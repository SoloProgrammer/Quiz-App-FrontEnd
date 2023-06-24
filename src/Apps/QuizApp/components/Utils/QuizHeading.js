import React from 'react'
import { quizesIcon } from '../../Data/quizes'

const QuizHeading = ({ quiz, width50TechsArr }) => {
    return (
        <>
            <h3 className='text-2xl font-medium pb-7 justify-center '>
                Assesment of {quiz?.techs[0]} &nbsp;
                {quiz?.techs[0] && <img className='inline mb-1' width={width50TechsArr.includes(quiz?.techs[0]) ? 50 : 30} src={quizesIcon[quiz?.techs[0]]} alt="" />}
                &nbsp;
                {quiz?.techs[1] && <>{" & " + quiz?.techs[1]} &nbsp;</>}
                {quiz?.techs[1] && <><img className='inline mb-1' width={30} src={quizesIcon[quiz?.techs[1]]} alt="" />&nbsp;</>}
                skills
            </h3>
        </>
    )
}

export default QuizHeading
