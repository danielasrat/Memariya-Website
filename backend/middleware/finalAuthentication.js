const {NotFoundError, BadRequestError } = require('../errors');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const Final = require('../models/Final');

const final = async (req, res, next) => {
    const { courseId } = req.params;
    const { role, id } = req.user
    const final = await Final.findOne({ id: Number(courseId) });

    if (!final) {
        throw new NotFoundError('Final not found');
    }

    if (role === 'Instructor') {
        const instructor = await Instructor.findOne({ id: id });
        if (!instructor) {
            throw new NotFoundError('Instructor not found');
        }
        req.user.instructor = instructor
        
    } else if (role === 'Student') {
        const student = await Student.findOne({ id: req.user.id });
        if (!student) {
            throw new NotFoundError('Student not found');
        }
        const course = student.courses.find(course => course.id === Number(courseId))
        if (!course) {
            throw new NotFoundError('Course not found');
        }
        const progress = course.progress
        if (progress.length < 3) {
            throw new BadRequestError('You have not completed all milestones')
        }
        req.user.student = student
    }

    req.user.final = final
    next();
}
module.exports = final;