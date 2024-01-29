const {NotFoundError, BadRequestError,UnauthenticatedError } = require('../errors');
const Student = require('../models/Student');
const Course = require('../models/Course');

const rate = async (req, res, next) => {
    const { id } = req.params;
    let { courseId, rate } = req.body;
    if (rate > 5) {
        rate = 5
    } else if (rate < 1) {
        rate = 1
    }
    const student = await Student.findOne({id})
    if (!student) { 
        throw new BadRequestError('No student with this id');
    }
    const course = student.certificate.find(course => course.id === Number(courseId))
    if (!course) {
        throw new UnauthenticatedError('Not Qualified to rate this course');
    }
    req.user.rating = { courseId, rate,id }
    next()
}

module.exports = rate;
