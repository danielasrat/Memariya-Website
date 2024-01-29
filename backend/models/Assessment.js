const mongoose = require('mongoose');
const QuestionSchema = require('./Question')

const AssessmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
    },
    questions: [QuestionSchema],
    answer: {
        type: [Number],
        enum:[0,1,2,3],
        required: true,
    },
})

module.exports = mongoose.model('Assessment', AssessmentSchema)