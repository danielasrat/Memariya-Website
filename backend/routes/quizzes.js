const express = require('express');
const router = express.Router();

const { getQuiz,getScore } = require('../controllers/quizzes');

router.route('/').get(getQuiz).post(getScore);

module.exports = router;