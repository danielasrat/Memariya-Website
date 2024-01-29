const Quiz = require('../models/Quiz')
const quizzes = require('./quizzes.json')

const connectDB = require('../db/connect');
require('dotenv').config();
connectDB(process.env.MONGO_URI);

const populateQuizzes = async () => { 
    try{await Quiz.deleteMany();
        await Quiz.create(quizzes);
        console.log('Quizzes created');
    }
    catch(error){
        console.log(error);
    }
}
populateQuizzes();
