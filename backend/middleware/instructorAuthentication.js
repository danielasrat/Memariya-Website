const { UnauthenticatedError, NotFoundError } = require('../errors');
const Instructor = require('../models/Instructor');

const instructor = async (req, res, next) => { 
    if (req.user.role !== 'Instructor') {
        // console.log(req.user.role);
        throw new UnauthenticatedError('Authentication invalid');
    }
    if (req.user.id !== Number(req.params.id)) {
        // console.log(req.user.id);
        throw new UnauthenticatedError('Authentication invalid');
    }
    const id = req.user.id;
    const instructor = await Instructor.findOne({ id });
    if (!instructor) { 
        throw new NotFoundError(`No instructor with id : ${id}`);
    }
    req.user.instructor = instructor;
    next();
}

module.exports = instructor;