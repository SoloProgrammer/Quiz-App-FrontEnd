import React, { useEffect, useState } from 'react'
import Questionnaire from '../components/Questionnaire/Questionnaire';
import StartTest from '../components/StartTest/StartTest';
import { useNavigate } from 'react-router-dom';
import ResultBox from '../components/Result/ResultBox';

const Home = ({ user, setUser, loading }) => {

  const navigate = useNavigate();

  const [isStarted, setIsStarted] = useState(false);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [score, setScore] = useState({});
  const [testEnded, setTestEnded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({})

  useEffect(() => {
    if (user) {
      if (user.isStarted && !isStarted) {
        user.isSubmitted ? navigate('/submitted') : navigate('/activity-not-allowed')
      }
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <div>
      {
        !testEnded
          ?
          isStarted
            ?
            <Questionnaire user={user} setTestEnded={setTestEnded} testEnded={testEnded} questionnaire={questionnaire} setScore={setScore} setQuestionnaire={setQuestionnaire} score={score} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            :
            <StartTest setIsStarted={setIsStarted} user={user} setUser={setUser} loading={loading} setQuestionnaire={setQuestionnaire} />
          :
          <ResultBox user={user} score={score} totalQuestions={questionnaire.questions.length} attempted={Object.keys(selectedOptions).length}/>
      }
    </div>
  )
}

export default Home
