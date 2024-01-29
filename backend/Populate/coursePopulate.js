const Course = require('../models/Course');
const courses = require('./courses.json');

const connectDB = require('../db/connect');
require('dotenv').config();
connectDB(process.env.MONGO_URI);

const populateCourses = async () => { 
    await Course.deleteMany();
    await Course.create(courses);
    console.log('Course created')
}
populateCourses();
