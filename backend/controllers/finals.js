const Final = require('../models/Final');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const Course = require('../models/Course');
const {BadRequestError,UnauthenticatedError, NotFoundError} = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getFinal = async (req, res) => {
    const final = req.user.final
    res.status(StatusCodes.OK).json( final.questions);
 }

const getScore = async (req, res) => { 
    const { courseId } = req.params;
    const final = req.user.final
    const { answer } = req.body;
    const correctAnswer = final.answer
    let score = 0
    for (let i = 0; i < answer.length; i++) {
        if (Number(answer[i] )=== correctAnswer[i]) {
            score += 1
        }
    }
    if (score > 7 && req.user.role === 'Student') {
        const student = req.user.student
        if (student) {
            const badge = student.certificate.find(badge => badge.id === Number(courseId))
            if (!badge) {
                const course = await Course.findOne({ id: Number(courseId) })
                student.certificate.push({ id: Number(courseId), name: course.name, level: course.level })
                await student.save();
            }
        }
    } else if (score > 7 && req.user.role === 'Instructor') {
        const instructor = req.user.instructor
        if (instructor) {
            const badge = instructor.courses.find(badge => badge.id === Number(courseId))
            if (!badge) {
                const course = await Course.findOne({ id: Number(courseId) })
                instructor.courses.push({ id: Number(courseId), name: course.name, level: course.level })
                await instructor.save();
            }
        }
    }
    res.status(StatusCodes.OK).json(score);
}

module.exports = {
    getFinal,
    getScore,
}