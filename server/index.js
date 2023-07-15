import express from "express";
import cors from 'cors'
import { wordsRouter } from "./routes/words.js";
import { rankRouter } from "./routes/rank.js";

const app = express()
app.use(express.json())
app.use(cors())

app.use('/words',wordsRouter)
app.use('/rank',rankRouter)



    const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})