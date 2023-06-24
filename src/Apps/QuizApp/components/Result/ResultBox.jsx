import { Button, Container } from '@mui/material'
import React from 'react'
import './ResultBox.css'
import { badges, outlineGreenTickImg } from '../../Icons_Images/Icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BadgeComponent from '../BadgeBox/BadgeComponent'
const ResultBox = ({ totalQuestions, attempted }) => {

    let { score } = useSelector(state => state.questionnaire)
    let { user } = useSelector(state => state.user)
    let { quiz } = useSelector(state => state.quizes)

    console.log(user.badges);

    return (
        <Container maxWidth="xl" sx={{ display: 'flex', height: "100vh", justifyContent: "center", alignItems: "center" }}>

            {
                user?.badges.length > 0
                &&
                user?.badges.map(b => b.quiz).includes(quiz?._id)
                &&
                <BadgeComponent badge={user?.badges.filter(b => b.quiz === quiz?._id)[0].badge} />
            }

            <div className="bg-white scoreCard p-3 md:p-7 shadow-lg scoreCard rounded-md !pb-1">
                <div className='mb-7'>
                    <h4 className='text-4xl roboto text-gray-600 mb-3'>Thanks for your time</h4>
                    <h5 className='text-xs font-bold text-green-500'>Dear Candidate, your test has been successfully submitted.
                        <span><img className='w-8 mr-3 inline-block' src={outlineGreenTickImg} alt="" /></span>
                        <br />
                        <span className='mt-1 text-gray-500'>You can view your statistics below.</span></h5>
                </div>
                <div className='text-left mb-5 text-xs roboto flex flex-col md:flex-row md:justify-between ml-2 md:ml-1'>
                    <p>Name: <span className='ml-2'>{user.name}</span></p>
                    <p>Email: <span className='ml-2'>{user.email}</span></p>
                </div>
                <h3 className='text-left ml-1 mb-2 font-semibold text-gray-600'>Statistics <img className='inline-block w-5 mb-2 opacity-80' src="https://cdn-icons-png.flaticon.com/512/548/548133.png" alt="statistics" /></h3>
                <div className="Test-detail flex flex-col shadow-md p-4 rounded-lg font-semibold">
                    <div className="--top flex  justify-between w-full pb-4">
                        <div className="title text-left flex flex-col gap-3">
                            <p>Total Questions</p>
                            <p>You have atempted</p>
                            <p>Correct Answers</p>
                        </div>
                        <div className="value text-left flex flex-col gap-3">
                            <p>{totalQuestions}</p>
                            <p>{attempted}</p>
                            <p>{score / 10}</p>
                        </div>
                    </div>
                    <div className="--bottom flex justify-between border-t border-gray-300 pt-4">
                        <p className='underline text-gray-500'>Your Score </p><p className='mr-1'>{score}</p>
                    </div>
                </div>
                <div className='my-3 flex w-full justify-between items-center'>
                    <p className='roboto'><span className='bold text-gray-700'>QUIZ</span>: <span className='text-gray-600'>{quiz?.techs.join(" + ")}</span></p>
                    <Link to={'/'}><Button className='!bg-gray-100 !px-10 hover:!bg-gray-200'>HOME</Button></Link>
                </div>
            </div>
        </Container>
    )
}

export default ResultBox
