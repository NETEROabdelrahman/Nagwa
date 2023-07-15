import express from "express";
import fs from 'fs'

const router = express.Router();


const rawData = fs.readFileSync('TestData.json');
const data = JSON.parse(rawData);

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  router.get('/', async (req, res) => {
    const adjectives = data.wordList.filter(word => word.pos === 'adjective');
    const adverbs = data.wordList.filter(word => word.pos === 'adverb');
    const nouns = data.wordList.filter(word => word.pos === 'noun');
    const verbs = data.wordList.filter(word => word.pos === 'verb');
  
    const result = [];
  
    // Add one random adjective, adverb, noun, and verb to the result array
    result.push(getRandomElement(adjectives));
    result.push(getRandomElement(adverbs));
    result.push(getRandomElement(nouns));
    result.push(getRandomElement(verbs));
  
    // Shuffle the remaining words and select the first 6 unique words
    const remaining = data.wordList.filter(word =>
      word !== result[0] &&
      word !== result[1] &&
      word !== result[2] &&
      word !== result[3]
    );
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }
    for (let i = 0; i < 6; i++) {
      if (!result.includes(remaining[i])) {
        result.push(remaining[i]);
      }
    }
    // shuffling the array
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
  
    res.json(result);
  });

  
  



export {router as wordsRouter}