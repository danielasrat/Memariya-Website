const { UnauthenticatedError } = require('../errors');

const student = async (req, res, next) => { 
    if (req.user.role !== 'Student') {
        throw new UnauthenticatedError('Authentication invalid');
    }
    next();
}

module.exports = student;