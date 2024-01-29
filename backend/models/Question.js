const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please provide question'],
    },
    choice: {
        type: [String],
        required: [true, 'Please provide choices']
    },
});

module.exports = QuestionSchema;
