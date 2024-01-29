const Course = require('../models/Course');
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,UnauthenticatedError, NotFoundError} = require('../errors');


const getAllCourses = async (req, res) => {
    const courses = await Course.find({})
    res.status(200).json(courses);
}
const getCourse = async (req, res) => {

    const id = Number(req.params.id);
    const course = await Course.findOne({ id });
    if (!course) {
        throw new NotFoundError(`No course with id : ${id}`);
    }
    res.status(StatusCodes.OK).json({ course });
}

const getRate = async (req, res) => {
    const id = Number(req.params.id);
    const course = await Course.findOne({ id });
    if (!course) {
        throw new NotFoundError(`No course with id : ${id}`);
    }
    const len = Object.keys(course.rating.users).length || 1

    res.status(StatusCodes.OK).json(course.rating.count/len);

}


module.exports = {
    getAllCourses,
    getCourse,
    getRate

}