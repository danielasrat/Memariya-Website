const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const BadgeSchema = require('./Badge')
const ratingSchema = require('./Rating')

const TutorSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Please provide id'],
    },
    name: {
        type: String,
        required: [true, 'name must be provided'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'please provied email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide a valid email'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'please provied password'],
        minlength: 6,
    },
    bio: {
        type: String,
        default: '',
        maxlength: 50
    },
    rating: {
        type: ratingSchema,
        default: {
            users: {},
            count:0
        }
    },
    hourlyRate: {
        type: Number,
        default: 10
    },
    courses: {
        type: [BadgeSchema],
        default: []        
    }
})

TutorSchema.methods.hashPassword  = async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    this.save()
}

TutorSchema.methods.createJWT = function () {
    return jwt.sign({Id: this.id, name: this.name,role:"Instructor"}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

TutorSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}



module.exports = mongoose.model('Instructor', TutorSchema)