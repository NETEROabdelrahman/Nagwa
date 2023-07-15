import axios from 'axios';
import { useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css'; 
import {theRank, words} from '../types/types'

const WORDS_URL = 'http://localhost:3003/words'
const RANK_URL = 'http://localhost:3003/rank'

const Exam = () => {
    const [welcome, setWelcome] = useState<boolean>(true)
    const [data, setData] = useState<words[] | null>(null)
    const [selectedOption, setSelectedOption] = useState<string>('')
    const [wordIndex, setWordIndex] = useState<number>(0)
    const [correctAnswers, setCorrectAnswers] = useState<number>(0)
    const [finalScore, setFinalScore] = useState<boolean | null>(null)
    const [rank, setRank] = useState<theRank | null>(null)


    //custom alerts
    const alertWarning = () => toast.warning('please choose an answer!');
    const alertSuccess = () => toast.success('correct answer');
    const alertError = () => toast.error('wrong answer');

    //get data from the server
    const fetchData = async () => {
        const res = await axios.get(WORDS_URL)
        setData(res.data)
    }

    //send final results to the server
    const sendResults = async () => {
        const res = await axios.post(RANK_URL, { score: correctAnswers * 10 })
        setRank(res.data)
    }



    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedOption) {
            alertWarning()
        } else {
            if (data && wordIndex < data.length) setWordIndex(prev => prev + 1)
            setSelectedOption('');
            if (data) {
                if (selectedOption === data[wordIndex].pos) {
                    alertSuccess()
                    setCorrectAnswers(prev => prev + 1)
                } else {
                    alertError()
                }
            }
            if (data && wordIndex === data.length - 1) {
                setFinalScore(true)
                sendResults()
            }
        }
    }
    

    return (
        <div className=' flex justify-center items-center h-[100vh] md:mx-28 mx-0 rounded'>
            <ToastContainer floatingTime={500} />
            {welcome ? <div className='flex justify-center items-center flex-col bg-white p-3 rounded'>
                <h1 className=' font-bold text-center p-5'>Welcome to "Part of Speech" Test!</h1>
                <button className='p-3 rounded bg-slate-700 text-white' onClick={() => {
                    fetchData()
                    setWelcome(false)
                }}>proceed</button>
            </div> : <>{finalScore ? <div>
                <h1>you scored: {correctAnswers * 10}</h1>
                <h1>your rank: {rank?.rank} %</h1>
                <h4
                    className='p-3 rounded bg-slate-700 text-white w-fit mx-auto cursor-pointer'
                    onClick={() => window.location.reload()}
                >Try Again</h4>
            </div>
                : <div className='flex flex-col justify-center items-center w-full bg-white p-5 rounded'>
                    <div className='w-full p-5'>
                        <ProgressBar
                            completed={(wordIndex + 1) * 10}
                            bgColor='blue'
                            labelSize='10px'
                        />
                    </div>
                    <h1 className='text-[#3c3cd3]'>{data && data[wordIndex]?.word}</h1>
                    <form onSubmit={handleSubmit} className='flex w-full flex-row flex-wrap'>
                        <label className='w-1/2 p-3 text-center flex flex-row gap-2 justify-center items-center'>
                            <input
                                type="radio"
                                value="noun"
                                checked={selectedOption === 'noun'}
                                onChange={handleOptionChange}
                            />
                            <h5>noun</h5>
                        
                        </label >
                        <label className='w-1/2 p-3 text-center flex flex-row gap-2 justify-center items-center'>
                            <input
                                type="radio"
                                value="verb"
                                checked={selectedOption === 'verb'}
                                onChange={handleOptionChange}
                            />
                            <h5>verb</h5>

                        </label>
                        <label className='w-1/2 p-3 text-center flex flex-row gap-2 justify-center items-center'>
                            <input
                                type="radio"
                                value="adverb"
                                checked={selectedOption === 'adverb'}
                                onChange={handleOptionChange}
                            />
                            <h5>adverb</h5>

                        </label>
                        <label className='w-1/2 p-3 text-center flex flex-row gap-2 justify-center items-center'>
                            <input
                                type="radio"
                                value="adjective"
                                checked={selectedOption === 'adjective'}
                                onChange={handleOptionChange}
                            />
                            <h5>adjective</h5>

                        </label>
                        <button type="submit" className=' text-white bg-slate-700 rounded p-4 w-fit mx-auto'>Submit</button>
                    </form>
                    
                </div>}</>
            }
        </div>
    )
};

export default Exam