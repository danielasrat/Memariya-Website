const Instructor = require('../models/Instructor');
const instructors = require('./instructors.json');

const connectDB = require('../db/connect');
require('dotenv').config();
connectDB(process.env.MONGO_URI);

const populateinstructors = async () => { 
    try {
        await Instructor.deleteMany();
        for (let instructor of instructors) {
            let newInstructor = await Instructor.create(instructor);
            await newInstructor.hashPassword();
        }
        console.log('instructors created');
    }
    catch(error){
        console.log(error);
    }
}
populateinstructors();