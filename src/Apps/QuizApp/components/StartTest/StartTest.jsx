import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import './StartTest.css'
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
// import { createUser, getQuestionnaire } from '../../Helpers/AsyncCalls';
import { GetQuestionnaire } from '../../Redux/ThunkActions/QuestionnareActions';
import { useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setScore } from '../../Redux/Slices/QuestionnaireSlice';
import { singlequiz } from '../../Helpers/AsyncCalls';
import { setQuiz } from '../../Redux/Slices/QuizesSlice'
import { showToast } from '../../configs/Toast';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import { quizes, width50TechsArr } from '../../Data/quizes';
import QuizHeading from '../Utils/QuizHeading';

const StartTest = ({ setIsStarted }) => {


  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)
  const { questions } = useSelector(state => state.questionnaire)
  const { quiz } = useSelector(state => state.quizes)

  const location = useLocation()

  const params = useParams()

  const [quizDetail, setQuizDetail] = useState(quiz)
  const [quizloading, setQuizLoading] = useState(false)

  const getQuizDetail = async () => {

    setQuizLoading(true)
    let { quiz, error } = await singlequiz(params.slug)
    if (error || !quiz) {
      navigate('/')

    }
    setQuizLoading(false)
    setQuizDetail(quiz)
    dispatch(setQuiz(quiz))
  }

  useEffect(() => {
    // if (location.state) {
    //   dispatch(setQuiz(location.state))
    //   setQuizDetail(location.state)
    // }
    // else {
    // }
    if ((quiz && quiz.slug !== location.state.slug) || !quiz) {
      setQuizDetail(null)
      getQuizDetail()
    }
    // eslint-disable-next-line
  }, [])


  const [isDisabled, setIsDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!isChecked) {
      return setError(true)
    }
    else setError(false)
    
    if (quizDetail?.isStarted.includes(user?._id) && !quizDetail?.isSubmitted.includes(user?._id)) {
      navigate(`/quiz/${quiz.slug}/activity-not-allowed`)
      return
    }
    else if(quizDetail?.isSubmitted.includes(user?._id)){
      navigate(`/quiz/${quiz.slug}/submitted`)
    }


    if (!user) {
      showToast("", "Please login to proceed further!", 4000, <LockTwoToneIcon color='green' />)
      navigate('/login')
      return
    }

    setIsDisabled(true)
    e.target.textContent = "Preparing your test..."

    if (user?.isStarted && !user?.isSubmitted) {
      dispatch(GetQuestionnaire(quizDetail._id))
    }
    else if (user?.isStarted) {
      dispatch(setScore(user.score))
      user?.isSubmitted ? navigate('/submitted') : navigate('/activity-not-allowed')
    }
    dispatch(GetQuestionnaire(quizDetail._id))
  }

  useEffect(() => {

  }, [])

  // useEffect(() => {
  //   if (user) {
  //     console.log("---", user);
  //     if (user?.isStarted && !user?.isSubmitted) {
  //       dispatch(GetQuestionnaire('645ce48a5b5e820d4962e704'))
  //     }
  //     else if (user?.isStarted) {
  //       dispatch(setScore(user.score))
  //       user?.isSubmitted ? navigate('/submitted') : navigate('/activity-not-allowed')
  //     }
  //   }
  // }, [user, dispatch, navigate])

  useEffect(() => {
    if (questions) if (questions.length > 0) setIsStarted(true)
    // eslint-disable-next-line
  }, [questions])

  console.log(quizDetail?.techs.join(' + '), quizes.map(q => q.name).includes(quizDetail?.techs.join(' + ')));
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className='StartTestContainer p-0' sx={{ display: 'flex', height: "100vh", justifyContent: "center", alignItems: "center" }}>
        {
          <div className={`p-3 shadow-md rounded-sm  bg-white md:p-10 md:w-f startTestBox ${quizloading && 'loadingQuiz'}`}>

            <QuizHeading width50TechsArr={width50TechsArr} quiz={quizDetail} />

            <div className="align-text-left flex flex-col justify-start items-start">
              <h1 className='text-lg font-bold underline pb-4'>Here are some key points to keep in mind before taking the test</h1>
              <ul className='flex flex-col'>
                <li className='font-medium text-left list-disc mx-4 text-sm'>You will be asked 10 questions one another</li>
                <li className='font-medium text-left list-disc mx-4 text-sm'>{quizDetail?.each_point} points is rewarded for the correct answer</li>
                <li className='font-medium text-left list-disc mx-4 text-sm'>Each question has four options you can choose multiple of them as your asnwer</li>
                <li className='font-medium text-left list-disc mx-4 text-sm'>Once test has been started you will not be able to re-start the test</li>
                <li className='text-left list-disc mx-4 text-sm roboto font-medium text-red-500 bg-purple-100 w-fit px-1'>If you tried to refresh/reload the page you will not allowed for re-test!</li>
                <li className='text-left list-disc mx-4 text-sm font-medium'>You need to finish the test under {quizDetail?.timeLimit.minutes} minutes</li>
              </ul>
            </div>
            <p className='mt-4 font-bold text-sm flex justify-start'>
              <span>Note:</span>
              <span className='mx-2 text-blue-800 text-left'>{quizDetail?.description}</span>
            </p>
            <h3 className='my-3 font-semibold text-left text-gray-500'>Please check the below label and click the "Start the test" button</h3>
            <form action="#" className='w-full mt-3 flex flex-col gap-2 '>
              {
                quizDetail
                &&
                <>
                  <FormControlLabel value={isChecked} onChange={() => {
                    setIsChecked(!isChecked)
                    setError(false)
                  }} required control={<Checkbox />} label="I have read the above points carefully!" />
                  {error && <FormHelperText error className='!font-bold'>*Please check the above to continue</FormHelperText>}
                </>

              }
              <button disabled={isDisabled} onClick={handleSubmit} className='transition-all w-full px-5 py-3 bg-purple-500 mt-4 font-bold text-lg text-white hover:bg-purple-700 disabled:hover:bg-purple-300 disabled:bg-purple-300'>Start the test</button>
            </form>

          </div>

        }
      </Container>
    </>
  )
}

export default StartTest
