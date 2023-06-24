import React, { useEffect, useState } from 'react'
import Questionnaire from '../components/Questionnaire/Questionnaire';
import StartTest from '../components/StartTest/StartTest';
import { useNavigate } from 'react-router-dom';
import ResultBox from '../components/Result/ResultBox';
import { useSelector } from 'react-redux';

const Quiz = () => {

  const navigate = useNavigate();
  const { questions } = useSelector(state => state.questionnaire)
  const { user } = useSelector(state => state.user)

  const [isStarted, setIsStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({})
  

  return (
    <div>
      {
        !testEnded
          ?
          isStarted
            ?
            <Questionnaire setTestEnded={setTestEnded} testEnded={testEnded} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            :
            <StartTest setIsStarted={setIsStarted}/>
          :
          <ResultBox totalQuestions={questions?.length} attempted={Object.keys(selectedOptions).length} />
      }
    </div>
  )
}

export default Quiz
