const mongoose = require('mongoose');


const ratingSchema = new mongoose.Schema({
    users: {
        type: Object,
        default:{}
    },
    count: {
        type: Number,
        default : 0
    }
})

module.exports = ratingSchema;