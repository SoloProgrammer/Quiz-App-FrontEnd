export const getTotalScore = (scoreObj) => {
    return Object.keys(scoreObj).reduce((totalScore,key)=>{
        totalScore += scoreObj[key]
        return totalScore
    },0);
}
