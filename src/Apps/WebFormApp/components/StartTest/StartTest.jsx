import React, { useState } from 'react'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import './StartTest.css'
import { TextField } from '@mui/material';
import { JsIcon, reactIcon } from '../../StaticImages/Icons';
import { createtUser, getQuestionnaire } from '../../Helpers/AsyncCalls';
import { useNavigate } from 'react-router-dom';

const StartTest = ({ setIsStarted, setUser, loading, setQuestionnaire }) => {

  const navigate = useNavigate()

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

    if (inputFiled.name === '' && inputFiled.email === '') {
      setInputField({ ...inputFiled, nameErrorText: "Name is required", emailErrorText: "Email is required" })
    }
    else if (inputFiled.name === '') {
      setInputField({ ...inputFiled, nameErrorText: "Name is required" })
    }
    else if (inputFiled.email === '') {
      setInputField({ ...inputFiled, emailErrorText: "Email is required" })
    }
    else {
      setIsDisabled(true)
      e.target.textContent = "Preparing your test..."
      let data = await createtUser(inputFiled.name, inputFiled.email);

      localStorage.setItem('token', data.token)
      
      if (!data.userExists) {
        let questionnaire = await getQuestionnaire();
        setQuestionnaire(questionnaire);
        data.newUser && setIsStarted(true);
        setUser(data.newUser)
      }
      else {
        setUser(data.user)
        if (data.user.isStarted) {
          data.user.isSubmitted ? navigate('/submitted') : navigate('/activity-not-allowed')
        }
      }

    }
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className='StartTestContainer p-0' sx={{ display: 'flex', height: "100vh", justifyContent: "center", alignItems: "center" }}>
        {
          loading
            ?
            <>

              <div className='w-full h-full bg-white flex items-center justify-center'>
                <img className='w-44' src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif" alt="loading" />
              </div>

            </>
            :
            <div className="p-3 shadow-md rounded-sm  bg-white md:p-10 md:w-f startTestBox">
              <h3 className='text-2xl font-medium pb-7 justify-center md:text-3xl '>Assesment of React <span className='px-2 '><img className='inline mb-1' width={30} src={reactIcon} alt="react" /></span> & Javascript <span className='px-2'><img className='inline mb-1' width={30} src={JsIcon} alt="" /></span> skills</h3>

              <div className="align-text-left flex flex-col justify-start items-start">
                <h1 className='text-lg font-bold underline pb-4'>Here are some key points to keep in mind before taking the test</h1>
                <ul className='flex flex-col'>
                  <li className='font-medium text-left list-disc mx-4 text-sm'>You will be asked 10 questions one another</li>
                  <li className='font-medium text-left list-disc mx-4 text-sm'>10 points is rewarded for the correct answer</li>
                  <li className='font-medium text-left list-disc mx-4 text-sm'>Each question has four options you can choose multiple of them as your asnwer</li>
                  <li className='font-medium text-left list-disc mx-4 text-sm'>Once test has been started you will not be able to re-start the test</li>
                  <li className='text-left list-disc mx-4 text-sm roboto font-medium text-red-500'>If you tried to refresh/reload the page you will not allowed for re-test!</li>
                  <li className='text-left list-disc mx-4 text-sm font-medium'>You need to finish the test under 15 minutes</li>
                </ul>
              </div>
              <p className='mt-4 font-bold text-sm'>
                <span>Note:</span>
                <span className='mx-2 text-blue-800'>This questionnaire is designed to access your level of proficiency in React and Javascript.</span>
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
