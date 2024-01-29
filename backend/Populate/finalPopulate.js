const Final = require('../models/Final');
const finals = require('./finals.json');

const connectDB = require('../db/connect');
require('dotenv').config();
connectDB(process.env.MONGO_URI);

const populateFinals = async () => { 
    try{await Final.deleteMany();
        await Final.create(finals);
        console.log('Finals created');
    }
    catch(error){
        console.log(error);
    }
}
populateFinals();