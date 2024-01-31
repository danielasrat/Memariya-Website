const express = require('express');
const router = express.Router();
const instructorAuth = require('../middleware/instructorAuthentication');


const {getAllInstructors,updateInstructor ,getAllCourses,addCourse, deleteCourse, getRate } = require('../controllers/instructors');


router.route('/').get(getAllInstructors);
router.use('/:id',instructorAuth);
router.route('/:id/').patch(updateInstructor);
router.route('/:id/rate').get(getRate);
router.route('/:id/courses').get(getAllCourses).post(addCourse);
router.route('/:id/courses/:courseId').delete(deleteCourse);


module.exports = router;