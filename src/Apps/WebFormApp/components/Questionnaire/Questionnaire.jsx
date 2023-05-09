import { Button, Checkbox, Container, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { JsIcon, reactIcon } from '../../StaticImages/Icons'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Questionnaire.css'
import AssesmentTitle from '../AssesmentTitle'
import Timer from '../Utils/Timer';
import { submitTest } from '../../../../Helpers/AsyncCalls';
import { useNavigate } from 'react-router-dom';

const Questionnaire = ({ questionnaire, setScore, score }) => {

    const [selectedOptions, setSelectedOptions] = useState({})
    const [questionNo, setQuestionNo] = useState(0);
    const [errorText, setErrorText] = useState(false);
    const navigate = useNavigate()

    const handleToggle = (value) => {

        setErrorText(false)

        if (selectedOptions[questionNo]) {
            if (selectedOptions[questionNo].includes(value)) setSelectedOptions({ ...selectedOptions, [questionNo]: selectedOptions[questionNo].filter(ans => ans !== value) })
            else setSelectedOptions({ ...selectedOptions, [questionNo]: [...selectedOptions[questionNo], value] })
        }
        else {
            setSelectedOptions({ ...selectedOptions, [questionNo]: [value] })
        }
    }

    const [comment, setComment] = useState({})

    const handleChangeComment = (e) => setComment({ ...comment, [questionNo]: e.target.value });

    const handleNext = async () => {

        // setScore(score - 10)

        if (selectedOptions[questionNo] && selectedOptions[questionNo].length > 0) {

            let correctAnswersArray = questionnaire.questions[questionNo].answers.filter(ans => ans.isCorrect).map(ans => ans.answer);

            // console.log(selectedOptions[questionNo], questionNo, correctAnswersArray);

            let correctAnswersSelected = selectedOptions[questionNo].reduce((correct, ans) => {
                if (correctAnswersArray.indexOf(ans) !== -1) correct++
                return correct
            }, 0)

            if (correctAnswersArray.length === correctAnswersSelected && correctAnswersArray.length === selectedOptions[questionNo].length) setScore({ ...score, [questionNo]: 10 })
            else setScore(Object.keys(score)
                .filter((key) => !key.includes(questionNo))
                .reduce((obj, key) => {
                    return Object.assign(obj, {
                        [key]: score[key]
                    });
                }, {}));


            if ((questionNo + 1) < questionnaire.questions.length) {
                setQuestionNo(questionNo + 1)
            }
            else {
                let TotalScore = Object.keys(score).reduce((Total, key) => {
                    Total += score[key]
                    return Total
                }, 0)

                // console.log("Your Score is: ", TotalScore);
               let res = await submitTest(TotalScore)
               if(res) navigate('/submitted')

            }
        }
        else setErrorText(true)
    }

    const handlePrevious = () => {
        setErrorText(false)
        setQuestionNo(questionNo - 1)
        // score && setScore(score - 10)
    }

    useEffect(() => {

    }, [questionnaire])

    function isLastQuestion() {
        return questionNo === questionnaire.questions.length - 1
    }

    return (
        <Container maxWidth="xl" className='items-center' sx={{ display: 'flex', height: "100vh", justifyContent: "center" }}>
            <div className="p-3 shadow-md rounded-sm bg-white questionsBox overflow-hidden ">

                <AssesmentTitle textwidth1={'text-xl'} textwidth2={'text-2xl'} />

                <div className="questions--top flex justify-between px-2 py-2 border-b border-b-cyan-900 items-center">
                    <div className="category text-sm font-bold flex gap-1 items-center">
                        <div className='rounded-full overflow-hidden flex'>
                            <img className='inline-block' src={questionnaire.questions[questionNo].category === "React" ? reactIcon : JsIcon} alt="react" />
                        </div>
                        <span>{questionnaire.questions[questionNo].category}</span>
                    </div>

                    <Timer min={questionnaire.timeLimit.minutes} hours={questionnaire.timeLimit.hours} />

                </div>
                {
                    questionnaire.questions.map((q, i) => {
                        return (
                            <div key={q.id} className={`questions pt-4 pb-5 relative ${i !== questionNo && 'hidden'}`}>
                                <span className='absolute top-1 right-1 text-sm  text-blue-500 roboto'><b><span>Question</span>: {questionNo + 1}</b> of <b>{questionnaire.questions.length}</b></span>
                                <div className="question">
                                    <h1 className='text-xl my-3 font-semibold text-left text-gray-600 '><span className='question_num'>{i + 1} )</span> {q.question}</h1>
                                </div>
                                <div className="options flex flex-col gap-1">
                                    {
                                        q.answers.map((item, i) =>
                                            <ListItem
                                                className='bg-slate-100'
                                                key={i}
                                                secondaryAction={
                                                    <IconButton edge="end" aria-label="comments">

                                                    </IconButton>
                                                }
                                                disablePadding
                                            >
                                                <ListItemButton role={undefined} dense onClick={() => handleToggle(item.answer)}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={(selectedOptions[questionNo] ? selectedOptions[questionNo].includes(item.answer) : false)}
                                                            tabIndex={-1}
                                                            // disableRipple
                                                            inputProps={{ 'aria-labelledby': item.answer }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={2} primary={item.answer} />
                                                </ListItemButton>
                                            </ListItem>)
                                    }
                                </div>
                                {
                                    errorText
                                    &&
                                    <p className='absolute -bottom-2 text-xs font-medium roboto left-0 text-red-600'>*please select atleast one option</p>
                                }
                            </div>
                        )
                    })
                }

                <div className="commentBox w-full mt-5 border-t border-t-cyan-900 pt-3">
                    <p className='font-semibold text-xs text-left mb-2 text-gray-600'>If you find any question incorrect or the options are incorrect, or if you have any feedback about a particular question, please comment below 👇</p>
                    <TextField
                        className='w-full'
                        id="filled-multiline-static"
                        label="Your comment"
                        multiline
                        value={comment[questionNo] ?? ""}
                        onChange={handleChangeComment}
                        rows={2}
                        variant="filled"
                    />
                </div>
                <div className="nextBtn mt-3 flex justify-between">
                    <Button disabled={!questionNo} onClick={handlePrevious} variant="contained" size="medium" className='w-36' startIcon={<><NavigateBeforeIcon /></>}>
                        Previous
                    </Button>
                    <Button onClick={handleNext} variant="contained" size="medium" className={`w-36`} endIcon={!isLastQuestion() ? <NavigateNextIcon /> : <ExitToAppIcon />}>
                        {isLastQuestion() ? "End test" : "Next"}
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default Questionnaire
