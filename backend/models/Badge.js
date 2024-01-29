const mongoose = require('mongoose');
const BadgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided'],
    },
    id: {
        type:Number,
        required: [true, 'Please provide Course'] ,
    },
    level: {
        type: String,
        required: [true, 'Please provide Level'] ,
        enum: ['Beginner','Advanced', 'Intermediate']
    },
})

module.exports = BadgeSchema