const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const bcrypt = require('bcryptjs');
const {StatusCodes } = require('http-status-codes');
const {BadRequestError,UnauthenticatedError} = require('../errors');

const register = async (req, res) => { 
    if (req.body.role === 'Instructor') {
        const { name, email, password } = req.body;

        const lastUser = await Instructor.findOne().sort({ id: -1 }).exec();
        const id = lastUser ? lastUser.id + 1 : 0
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const instructor = await Instructor.create({ id,name, email, password: hashedPassword});
        const token = instructor.createJWT();
        res.status(StatusCodes.CREATED).json({ instructor: {id, name: instructor.name,email: instructor.email }, token });
    } else if (req.body.role === 'Student') {
        const { name, email, password } = req.body;
        
        const lastUser = await Student.findOne().sort({ id: -1 }).exec();
        const id = lastUser ? lastUser.id + 1 : 0
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await Student.create({id, name, email, password: hashedPassword});
        const token = student.createJWT();
        res.status(StatusCodes.CREATED).json({ student: { id,name: student.name,email: student.email }, token });
    }
}


const login = async (req, res) => {
    const { email, password,role} = req.body;
    if (!email || !password || !role) {
        throw new BadRequestError('please provide email and password');
    }
    let user
    if (role === 'Instructor') {
        user = await Instructor.findOne({ email });
    } else if (role === 'Student') {
        user = await Student.findOne({ email });
    }

    if (!user) {
        throw new UnauthenticatedError('invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('invalid credentials');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: {id:user.id, name: user.name, email: user.email }, token });


 }


module.exports = {register,login}