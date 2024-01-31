const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const BadgeSchema = require('./Badge')

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided'],
    },
    id: {
        type: Number,
        required: [true, 'Please provide course'] 
    },
    level: {
        type: String,
        required: [true, 'Please provide Level'] ,
        enum: ['Beginner', 'Advanced', 'Intermediate']
    },
    progress: {
        type: [Number],
        enum: [1, 2, 3],
        default: []
    },
    goalDate: Date
}, {timestamps: true})

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Please provide id'],
        unique : true
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
    certificate: {
        type: [BadgeSchema],
        default: []
    },
    premium: {
        type: Boolean,
        default: false
    },
    courses: {
        type: [CourseSchema],
        default: []        
    }

})

UserSchema.methods.hashPassword  =async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
}

UserSchema.methods.createJWT = function () {
    return jwt.sign({Id: this.id, name: this.name,role:"Student"}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}



module.exports = mongoose.model('Student', UserSchema)