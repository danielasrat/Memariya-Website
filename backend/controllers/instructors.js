const Instructor = require('../models/Instructor')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError,UnauthenticatedError, NotFoundError} = require('../errors');


const getAllInstructors = async (req, res) => {
    const {course, level} = req.query
    const instructors = await Instructor.find({})
    let filtered = instructors
    if (course) {
        filtered = filtered.filter(instructor => {
            const courses = instructor.courses
            const badge = courses.find(badge => {
                return badge.name === course
            })
            if (badge && badge.name) {
                return badge.name === course
            }
            return false
        })
    }
    if (level) {
        filtered = filtered.filter(instructor => {
            const courses = instructor.courses
            const badge = courses.find(badge => {
                return badge.level === level
            })
            if (badge && badge.level) {
                return badge.level === level
            }
            return false
        })
    }
    // filtered = filtered ? filtered : instructors;
    filtered = filtered.map(instructor => {
        const { name, bio, email, rating, hourlyRate } = instructor
        const len = Object.keys(rating.users).length || 1
        const rate = rating.count/len
        return {name, bio, email,rate, hourlyRate}
    })
    filtered.sort((instructorA, instructorB) => instructorB.rate - instructorA.rate);
    
    res.status(StatusCodes.OK).json(filtered)
}

const updateInstructor = async (req, res) => { 
    const { name, bio, email } = req.body;
    const instructor = req.user.instructor;
    if (name) instructor.name = name;
    if (bio) instructor.bio = bio;
    if (email) instructor.email = email;
    await instructor.save();
    res.status(StatusCodes.OK).json(instructor);
}

const getAllCourses = async (req, res) => { 
    const instructor = req.user.instructor;
    res.status(StatusCodes.OK).json(instructor.courses);
}
const addCourse = async (req, res) => { 
    const instructor = req.user.instructor;
    const course = req.body;
    const duplicate = instructor.courses.find((c) => c.id === course.id);
    if (!duplicate) {
        instructor.courses.push(course);
        await instructor.save();
    }
    res.status(StatusCodes.OK).json(instructor.courses );
}

const deleteCourse = async (req, res) => { 
    const {courseId} = req.params;
    const instructor = req.user.instructor;

    const course = instructor.courses.find((course) => course.id === Number(courseId));
    if (!course) {
        throw new NotFoundError(`No course with id : ${courseId}`);
    }
    const courses = instructor.courses.filter((course) => course.id !== Number(courseId));
    instructor.courses = courses;
    await instructor.save();
    res.status(StatusCodes.OK).json({ courses, msg: `Course with id ${courseId} deleted` });

}
module.exports = {
    getAllInstructors,
    updateInstructor,
    getAllCourses,
    addCourse,
    deleteCourse,

}