const mongoose = require('mongoose');

const ratingSchema = require('./Rating')


const CourseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Please provide id'],
    },
    name: {
        type: String,
        required: [true, 'Please provide course name'],
        maxlength: 50
    },
    level: {
        type: String,
        enum: ['Beginner','Advanced', 'Intermediate']
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: 300
    },
    resource : {
        type: String,
        required: true,
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Invalid download link format'],
    },
    rating: {
        type: ratingSchema,
        default: {
            users: {},
            count:0
        }
    }
})

module.exports = mongoose.model('Course', CourseSchema)