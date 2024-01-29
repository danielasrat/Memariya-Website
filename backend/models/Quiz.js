const mongoose = require('mongoose');

const QuestionSchema = require('./Question')


const QuizSchema = new mongoose.Schema({
    id: {//id of the course
        type: Number,
        required: [true, 'Please provide id'],
    },
    milestone: {
        type: Number,
        enum: [1,2,3],
        required: [true, 'Please provide milestone'],
    },
    level: {
        type: String,
        enum: ['Beginner','Advanced', 'Intermediate']
    },
    questions: [QuestionSchema],
    answer: {
        type: [Number],
        enum:[0,1,2,3],
        required: true,
    },
})

module.exports = mongoose.model('Quiz', QuizSchema)