import React, { useEffect, useState } from 'react'
import questionnaireJSON from '../Data/QuestionnaireData.json'
import Questionnaire from '../components/Questionnaire/Questionnaire';
import StartTest from '../components/StartTest/StartTest';
import { useNavigate } from 'react-router-dom';

const Home = ({ user, setUser, loading }) => {

  const navigate = useNavigate()
  const [isStarted, setIsStarted] = useState(false);
  const [questionnaire, setQuestionnaire] = useState(questionnaireJSON);
  const [score, setScore] = useState({});

  useEffect(() =>{
    if(user){
      if(user.isStarted){
        user.isSubmitted ? navigate('/submitted') : navigate('/activity-not-allowed')
      }
    }
    // eslint-disable-next-line
  },[user])

  return (
    <div>
      {
        isStarted
          ?
          <Questionnaire questionnaire={questionnaire} setScore={setScore} setQuestionnaire={setQuestionnaire} score={score}/>
          :
          <StartTest setIsStarted={setIsStarted} user={user} setUser={setUser} loading={loading}/>
      }
    </div>
  )
}

export default Home
