const Assessment = require('../models/Assessment');
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,UnauthenticatedError, NotFoundError} = require('../errors');
const Student = require('../models/Student');
const Course = require('../models/Course');

const getAssessment = async (req, res) => {
    const { courseName } = req.params;
    const assessment = await Assessment.findOne({ name: courseName});
    if (!assessment) {
        throw new NotFoundError('Assessment not found');
    }
    res.status(StatusCodes.OK).json( assessment.questions);
}

const getScore = async (req, res) => { 
    const { courseName } = req.params;
    const assessment = await Assessment.findOne({ name: courseName});
    if (!assessment) {
        throw new NotFoundError('Assessment not found');
    }
    const { answer } = req.body;
    const correctAnswer = assessment.answer
    let score = 0
    for (let i = 0; i < answer.length; i++) {
        if (Number(answer[i]) === correctAnswer[i]) {
            score += 1
        }
    }
    if (score > 10) {

        const student = await Student.findOne({ id: req.user.id });
        const course = await Course.findOne({ name: courseName, level: 'Advanced' })
        // console.log(student, course)

        const duplicate = student.courses.find((c) => c.id === course.id);
        if (!duplicate) {
            student.courses.push({name: course.name, id: course.id, level: course.level});
            await student.save();
        }    


    } else if (score > 6) {
        const student = await Student.findOne({ id: req.user.id });
        const course = await Course.findOne({ name: courseName, level: 'Intermediate' })
        const duplicate = student.courses.find((c) => c.id === course.id);
        if (!duplicate) {
            student.courses.push({name: course.name, id: course.id, level: course.level});
            await student.save();
        }    
    }
    else {
        const student = await Student.findOne({ id: req.user.id });
        const course = await Course.findOne({ name: courseName, level: 'Beginner' })
        const duplicate = student.courses.find((c) => c.id === course.id);
        if (!duplicate) {
            student.courses.push({name: course.name, id: course.id, level: course.level});
            await student.save();
        }    
    }


    res.status(StatusCodes.OK).json(score);
}

module.exports = {
    getAssessment,
    getScore,
}