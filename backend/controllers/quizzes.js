const Quiz = require('../models/Quiz');
const Student = require('../models/Student');
const {BadRequestError,UnauthenticatedError, NotFoundError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const getQuiz = async (req, res) => {
    const { courseId, milestone } = req.query;
    const quiz = await Quiz.findOne({ id: Number(courseId), milestone });
    if (!quiz) {
        throw new NotFoundError('Quiz not found');
    }
    const questions = quiz.questions
    res.status(StatusCodes.OK).json(questions);
}

const getScore = async (req, res) => {
    const { courseId, milestone } = req.query;
    const {answer} = req.body;
    const quiz = await Quiz.findOne({ id: Number(courseId), milestone: Number(milestone) });
    if (!quiz) {
        throw new NotFoundError('Quiz not found');
    }
    const correctAnswer = quiz.answer
    let score = 0
    for (let i = 0; i < answer.length; i++) {
        if (Number(answer[i]) === Number(correctAnswer[i])) {
            score += 1
        }
    }
    if (score === 3) {
        const student = await Student.findOne({ id: req.user.id });
        if (student) {
            const progres = student.courses.map(course => {
                if (course.id === Number(courseId)) {
                    if (course.progress.includes(milestone)) {
                        return course
                    } else {
                        course.progress.push(milestone)
                    }
                }
                return course
            });
            await student.save();
        }
    }
    res.status(StatusCodes.OK).json(score);
}


module.exports = {
    getQuiz,
    getScore,
}