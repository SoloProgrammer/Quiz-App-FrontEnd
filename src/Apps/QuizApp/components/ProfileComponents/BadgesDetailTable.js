import React, { useCallback} from 'react'
import { useSelector } from 'react-redux'
import { badges } from '../../Icons_Images/Icons'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

const BadgesDetailTable = () => {

    const { quizes } = useSelector(state => state.quizes)
    const { user } = useSelector(state => state.user)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 20,
        pt: 2,
        px: 1,
        pb: 3,
    };

    const getRemainingdaysToRetakeQuiz = useCallback((quiz) => {
        if (user) {

            let currDate = new Date();
            let quizAttemptedDate = new Date(user?.score.filter(sc => sc.quiz === quiz._id)[0].date)

            let dateAfter30d = new Date(quizAttemptedDate.setDate(quizAttemptedDate.getDate() + 30))

            let timeDiff = dateAfter30d.getTime() - currDate.getTime()

            return String((Math.ceil(timeDiff / (1000 * 3600 * 24))) + 'd');
        }

    }, [user])
    function createData(quiz, score, badge, retakeIn) {
        return { quiz, score, badge, retakeIn };
    }

    const rows = user?.score.map(sc => {
        return createData(quizes?.filter(q => q._id === sc.quiz)[0].techs.join(" + "), sc.score, user?.badges.filter(b => b.quiz === sc.quiz).length === 1 ? user?.badges.filter(b => b.quiz === sc.quiz)[0].badge : null, getRemainingdaysToRetakeQuiz(quizes?.filter(q => q._id === sc.quiz)[0]))
    })

    return (
        <Box sx={{ ...style }} className=" w-full md:w-fit">
            <TableContainer component={Paper} className='!shadow-none'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Quiz</TableCell>
                            <TableCell align="center">Score</TableCell>
                            <TableCell align="right">Badge</TableCell>
                            <TableCell align="right">Retake In</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <TableRow
                                key={row.quiz}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.quiz}
                                </TableCell>
                                <TableCell align="center">{row.score}</TableCell>
                                <TableCell align="right" className='!flex'>
                                    {
                                        row.badge ?
                                            <img src={badges[row.badge]} alt="" className='w-8 md:w-10 m-0' />
                                            :
                                            "None"
                                    }
                                </TableCell>
                                <TableCell align="right">{row.retakeIn}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default BadgesDetailTable
