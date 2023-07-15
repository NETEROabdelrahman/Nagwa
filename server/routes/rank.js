import express from "express";
import fs from 'fs'

const router = express.Router();


const rawData = fs.readFileSync('TestData.json');
const data = JSON.parse(rawData);

router.post('/', async (req, res) => {
    const { score } = req.body
    const filteredArr = data.scoresList.filter(num => num < score)
    const arrLength = filteredArr.length
    const scoresListLength = data.scoresList.length
    const finalRank = ((arrLength/scoresListLength)*100).toFixed(2)

    res.json({rank:finalRank})
})


export {router as rankRouter}