const express = require('express');
const router = express.Router();
const finalAuthentication = require('../middleware/finalAuthentication');

const { getFinal, getScore } = require('../controllers/finals');

router.use('/:courseId',finalAuthentication)
router.route('/:courseId').get(getFinal).post(getScore);

module.exports = router;