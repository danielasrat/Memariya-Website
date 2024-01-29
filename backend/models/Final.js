const mongoose = require('mongoose');
const QuestionSchema = require('./Question')

const FinalSchema = new mongoose.Schema({
    id: { // course id
        type: Number,
        required: [true, 'Please provide id'],
    },
    questions: [QuestionSchema],
    answer: {
        type: [Number],
        enum:[0,1,2,3],
        required: true,
    },
})

module.exports = mongoose.model('Final', FinalSchema)