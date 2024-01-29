const Assessment = require('../models/Assessment');
const assessments = require('./assessments.json');

const connectDB = require('../db/connect');
require('dotenv').config();
connectDB(process.env.MONGO_URI);

const populateAssessments = async () => { 
    try{await Assessment.deleteMany();
        await Assessment.create(assessments);
        console.log('Assessments created');
    }
    catch(error){
        console.log(error);
    }
}
populateAssessments();
