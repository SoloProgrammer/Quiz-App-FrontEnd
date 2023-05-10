import { Button, Checkbox, Container, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { JsIcon, reactIcon } from '../../StaticImages/Icons'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Questionnaire.css'
import AssesmentTitle from '../AssesmentTitle'
import Timer from '../Utils/Timer';
import { putComment, submitTest } from '../../Helpers/AsyncCalls';
import LoadingButton from '@mui/lab/LoadingButton';

const Questionnaire = ({ questionnaire, setScore, score, setTestEnded, selectedOptions, setSelectedOptions, setQuestionnaire }) => {

    const [questionNo, setQuestionNo] = useState(0);
    const [errorText, setErrorText] = useState(false);
    const [loading, setloading] = useState(false);
    const [currQuesId, setCurrQuestionId] = useState(questionnaire.questions[0].id);

    useEffect(() => {
        setCurrQuestionId(questionnaire.questions[questionNo].id)
    }, [questionNo, questionnaire.questions])

    const handleToggle = (value) => {

        setErrorText(false)

        if (selectedOptions[currQuesId]) {
            if (selectedOptions[currQuesId].includes(value)) setSelectedOptions({ ...selectedOptions, [currQuesId]: selectedOptions[currQuesId].filter(ans => ans !== value) })
            else setSelectedOptions({ ...selectedOptions, [currQuesId]: [...selectedOptions[currQuesId], value] })
        }
        else {
            setSelectedOptions({ ...selectedOptions, [currQuesId]: [value] })
        }
    }

    const [comment, setComment] = useState({})

    const handleChangeComment = (e) => setComment({ ...comment, [currQuesId]: e.target.value });

    const handleNext = async () => {

        if (selectedOptions[currQuesId] && selectedOptions[currQuesId].length > 0) {

            console.log(comment);
            if (comment[currQuesId] && (questionnaire.questions[questionNo].comments.length === 0 || questionnaire.questions[questionNo].comments.filter(comm => comm.uId)[0].comment !== comment[currQuesId])) {
                setloading(true)
                let updatedQuestionnaire = await putComment(currQuesId, comment[currQuesId]);
                setloading(false)

                if (!updatedQuestionnaire) return
                setQuestionnaire(updatedQuestionnaire);

            }


            if ((questionNo + 1) < questionnaire.questions.length) {
                setQuestionNo(questionNo + 1)
            }
            else {

                // Submitting the test
                setloading(true)
                let score = await submitTest(selectedOptions);
                if (score) {
                    setTestEnded(true)
                    setloading(false)
                    setScore(score)
                }

            }
        }
        else setErrorText(true)
    }

    const handlePrevious = () => {
        setErrorText(false)
        setQuestionNo(questionNo - 1)
        // score && setScore(score - 10)
    }


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

                    <Timer setScore={setScore} setTestEnded={setTestEnded} setloading={setloading} min={questionnaire.timeLimit.minutes} hours={questionnaire.timeLimit.hours} selectedOptions={selectedOptions} />

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
                                        q.options.map((opt, i) =>
                                            <ListItem
                                                className='bg-slate-100'
                                                key={opt.id}
                                                secondaryAction={
                                                    <IconButton edge="end" aria-label="comments">

                                                    </IconButton>
                                                }
                                                disablePadding
                                            >
                                                <ListItemButton role={undefined} dense onClick={() => handleToggle(opt.option)}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={(selectedOptions[currQuesId] ? selectedOptions[currQuesId].includes(opt.option) : false)}
                                                            tabIndex={-1}
                                                            inputProps={{ 'aria-labelledby': opt.option }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={2} primary={opt.option} />
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
                        className='w-full text-sm'
                        id="filled-multiline-static"
                        label="Your comment"
                        multiline
                        value={comment[currQuesId] ?? ""}
                        onChange={handleChangeComment}
                        rows={2}
                        variant="filled"
                    />
                </div>
                <div className="nextBtn mt-3 flex justify-between">
                    <Button disabled={!questionNo} onClick={handlePrevious} variant="contained" size="medium" className='w-36' startIcon={<><NavigateBeforeIcon /></>}>
                        Previous
                    </Button>
                    <LoadingButton
                        color="primary"
                        loading={loading}
                        loadingPosition="center"
                        onClick={handleNext}
                        variant="contained"
                        size="medium"
                        className={`w-36`}
                        endIcon={!loading && (!isLastQuestion() ? <NavigateNextIcon /> : <ExitToAppIcon />)}>
                        {
                            !isLastQuestion() ? 'Next' : 'End Test'
                        }
                    </LoadingButton>
                </div>
            </div>
        </Container>
    )
}

export default Questionnaire
