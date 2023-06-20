import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import './StartTest.css'
import { TextField } from '@mui/material';
import { JsIcon, reactIcon } from '../../Icons_Images/Icons';
// import { createUser, getQuestionnaire } from '../../Helpers/AsyncCalls';
import { CreateUser } from '../../Redux/ThunkActions/UserActions';
import { GetQuestionnaire } from '../../Redux/ThunkActions/QuestionnareActions';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setScore } from '../../Redux/Slices/QuestionnaireSlice';
import { singlequiz } from '../../Helpers/AsyncCalls';

const StartTest = ({ setIsStarted }) => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const location = useLocation()

  const params = useParams()

  const [quizDetail, setQuizDetail] = useState(null)
  const [loading, setLoading] = useState(false)

  const getQuizDetail = async () => {

    setLoading(true)
    let { data, error } = await singlequiz(params.slug)
    if(error && !data.length) {
      console.log("--Get quiz detail error:")
    }
    setLoading(false)
    setQuizDetail(data[0])

  }

  useEffect(() => {
    if (location.state) {
      setQuizDetail(location.state)
    }
    else {
      getQuizDetail()
    }
     // eslint-disable-next-line
  }, [])

  const { user } = useSelector(state => state.user)
  const { questionnaire } = useSelector(state => state.questionnaire)

  let defaultInputvals = {
    email: "",
    emailErrorText: "",
    name: "",
    nameErrorText: ""
  }

  const [inputFiled, setInputField] = useState(defaultInputvals)

  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e) => {
    setInputField({ ...inputFiled, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email } = inputFiled

    if (name === '' && email === '') {
      setInputField({ ...inputFiled, nameErrorText: "Name is required", emailErrorText: "Email is required" })
    }
    else if (name === '') {
      setInputField({ ...inputFiled, nameErrorText: "Name is required" })
    }
    else if (email === '') {
      setInputField({ ...inputFiled, emailErrorText: "Email is required" })
    }
    else {
      setIsDisabled(true)
      e.target.textContent = "Preparing your test..."

      setLoading(true)

      if (user?.isStarted && !user?.isSubmitted) {
        dispatch(GetQuestionnaire('645ce48a5b5e820d4962e704'))
      }
      else if (user?.isStarted) {
        dispatch(setScore(user.score))
        user?.isSubmitted ? navigate('/submitted') : navigate('/activity-not-allowed')
      }

      dispatch(GetQuestionnaire(quizDetail._id))
    }
  }

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
    if (questionnaire) if (Object.keys(questionnaire).length > 0) setIsStarted(true)
    // eslint-disable-next-line
  }, [questionnaire])


  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className='StartTestContainer p-0' sx={{ display: 'flex', height: "100vh", justifyContent: "center", alignItems: "center" }}>
        {
          <div className={`p-3 shadow-md rounded-sm  bg-white md:p-10 md:w-f startTestBox ${loading && 'loadingQuiz'}`}>
            <h3 className='text-2xl font-medium pb-7 justify-center md:text-3xl '>Assesment of React <span className='px-2 '><img className='inline mb-1' width={30} src={reactIcon} alt="react" /></span> & Javascript <span className='px-2'><img className='inline mb-1' width={30} src={JsIcon} alt="" /></span> skills</h3>

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
              <span className='mx-2 text-blue-800'>{quizDetail?.description}</span>
            </p>
            <h3 className='my-3 font-semibold text-left text-gray-500'>Fill out the following details and click the "Start the test" button</h3>
            <form action="#" className='w-full mt-3 flex flex-col gap-2 '>
              <div className='w-full mt-3 flex flex-col gap-2 md:flex-1 md:flex-row'>
                <TextField
                  className='w-full'
                  error={inputFiled.nameErrorText ? true : false}
                  id='name'
                  label="Name"
                  name="name"
                  helperText={inputFiled.nameErrorText}
                  variant="filled"
                  value={inputFiled.name}
                  onChange={handleChange}
                />
                <TextField
                  className='w-full'
                  error={inputFiled.emailErrorText ? true : false}
                  id='email'
                  label="Email"
                  helperText={inputFiled.emailErrorText}
                  name='email'
                  variant="filled"
                  value={inputFiled.email}
                  onChange={handleChange}
                  type='email'
                />
              </div>
              <button disabled={isDisabled} onClick={handleSubmit} className='transition-all w-full px-5 py-3 bg-purple-500 mt-4 font-bold text-lg text-white hover:bg-purple-700 disabled:hover:bg-purple-300 disabled:bg-purple-300'>Start the test</button>
            </form>

          </div>

        }
      </Container>
    </>
  )
}

export default StartTest
