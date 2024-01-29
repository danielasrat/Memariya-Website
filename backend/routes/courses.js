const express = require('express');
const router = express.Router();

const { getAllCourses, getCourse, getRate} = require('../controllers/courses');

router.route('/').get(getAllCourses)
router.route('/:id').get(getCourse);
router.route('/:id/rate').get(getRate);
module.exports = router;