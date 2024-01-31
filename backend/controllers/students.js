const Student = require('../models/Student');
const Instructor = require('../models/Instructor')
const Course = require('../models/Course');
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,UnauthenticatedError, NotFoundError} = require('../errors');

const getAllStudents = async (req, res) => {
    const students = await Student.find({});
    res.status(StatusCodes.OK).json({students, nbHits: students.length});
}    

const updateStudent = async (req, res) => { 
    const id = req.params.id;
    const { name, email} = req.body;
    let update = {}
    if (name) update.name = name;
    if (email) update.email = email;
    // if (premium!==undefined) update.premium = premium;

    const student = await Student.findOneAndUpdate({ id },update , { new: true, runValidators: true });
    if (!student) { 
        throw new NotFoundError(`No student with id : ${id}`);
    }
    res.status(StatusCodes.OK).json(student);
}


const setPremium = async (req, res) => { 
    const id = req.params.id;
    const student = await Student.findOne({ id });
    if (!student) { 
        throw new NotFoundError(`No student with id : ${id}`);
    }
    student.premium = true;
    await student.save();
    res.status(StatusCodes.OK).json(student.premium);
}

const getPremium = async (req, res) => { 
    const id = req.params.id;
    const student = await Student.findOne({ id });
    if (!student) { 
        throw new NotFoundError(`No student with id : ${id}`);
    }
    res.status(StatusCodes.OK).json(student.premium);
}


const getAllCourses = async (req, res) => { 
    const { id } = req.params;
    const student = await Student.findOne({ id });
    if (!student) { 
        throw new NotFoundError(`No student with id : ${id}`);
    }    
    res.status(StatusCodes.OK).json(student.courses);
}    

const addCourse = async (req, res) => { 
    const { id } = req.params;
    const course = req.body;
    
    const student = await Student.findOne({ id });
    if (!student) {
        throw new NotFoundError(`No student with id : ${id}`);
    }
    const duplicate = student.courses.find((c) => c.id === Number(course.id));
    if (!duplicate) {
        student.courses.push(course);
        await student.save();
    }    
    res.status(StatusCodes.OK).json(student.courses);
}    

const deleteCourse = async (req, res) => {
    const { studentId, courseId } = req.params;
    const student = await Student.findOne({ id:studentId});
    if (!student) { 
        throw new NotFoundError(`No student with id : ${id}`);
    }    

    const course = student.courses.find((course) => course.id === Number(courseId));

    if (!course) {
        throw new NotFoundError(`No course with id : ${courseId}`);
    }    

    const courses = student.courses.filter((course) => course.id !== Number(courseId));
    student.courses = courses;
    await student.save();
    res.status(StatusCodes.OK).json({msg: `Course with id ${courseId} deleted` });
}    

const getProgress = async (req, res) => {
    const { id, courseId } = req.params;
    const student = await Student.findOne({ id });
    if (!student) { 
        throw new BadRequestError('No student with this id');
    }
    const course = student.courses.find((course) => course.id === Number(courseId));
    if (!course) {
        throw new BadRequestError('No course with this id');
    }
    const progress = course.progress.length/3*100;
    res.status(StatusCodes.OK).json(progress);
}
const getCertificate = async (req, res) => { 
    const student = await Student.findOne({ id: req.user.id });
    if (!student) { 
        throw new BadRequestError('No student with this id');
    }
    res.status(StatusCodes.OK).json(student.certificate);
}

const rate = async (req, res)=>{
    const { courseId, rate,id } = req.user.rating
    const course = await Course.findOne({ id: courseId })
    
    if (course.rating.users[id]) {
        course.rating.count -= course.rating.users[id]
    }
    course.rating.users[id] = rate
    course.rating.count += rate
    await course.save();
    
    const len = Object.keys(course.rating.users).length || 1
    res.status(StatusCodes.OK).json({msg:"rated successfully", rate:course.rating.count/len});
    
}

const rateInstructor = async (req, res) => { 
    const { id } = req.params;
    let { instructorId, rate } = req.body;
    if (rate > 5) {
        rate = 5
    } else if (rate < 1) {
        rate = 1
    }
    const student = await Student.findOne({id})
    if (!student) { 
        throw new BadRequestError('No student with this id');
    }
    const instructor = await Instructor.findOne({ id: instructorId })
    if (!instructor) { 
        throw new BadRequestError('No instructor with this id');
    }
    
    if (instructor.rating.users[id]) {
        instructor.rating.count -= instructor.rating.users[id]
    }
    
    instructor.rating.users[id] = rate
    instructor.rating.count += rate
    await instructor.save();

    const len = Object.keys(instructor.rating.users).length || 1
   res.status(StatusCodes.OK).json({msg:"rated successfully", rate:instructor.rating.count/len});
}

const setGoal = async (req, res) => {
    const { goalDate, courseId } = req.body;
    const { id } = req.user;
    const student = await Student.findOne({ id });
    if (!student) { 
        throw new NotFoundError(`No student with id : ${id}`);
    }  
    const course = student.courses.find((course) => course.id === Number(courseId));
    if (!course) {
        throw new NotFoundError(`No course with id : ${courseId}`);
    }
    course.goalDate = goalDate;
    await student.save();
    res.status(StatusCodes.OK).json(course.goalDate);
}

const getGoal = async (req, res) => { 
    let { courseId } = req.body;
    courseId = 0
    const { id } = req.user;
    const student = await Student.findOne({ id });
    if (!student) { 
        throw new NotFoundError(`No student with id : ${id}`);
    }  
    const course = student.courses.find((course) => course.id === Number(courseId));
    if (!course) {
        throw new NotFoundError(`No course with id : ${courseId}`);
    }
    // const response = course.goalDate ? course.goalDate : null;
    res.status(StatusCodes.OK).json(course.goalDate);
}


module.exports = {
    getAllStudents,
    updateStudent,
    getPremium,
    setPremium,
    getAllCourses,
    addCourse,
    deleteCourse,
    getProgress,
    getCertificate,
    rate,
    rateInstructor,
    setGoal,
    getGoal
};