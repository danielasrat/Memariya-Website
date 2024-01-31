require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const connectDB = require('./db/connect');

// Middleware
const authenticateUser = require('./middleware/authentication');
const studentAuthentication = require('./middleware/studentAuthentication');

// Routes
const authRouter = require('./routes/auth');
const coursesRouter = require('./routes/courses');
const studentsRouter = require('./routes/students');
const instructorsRouter = require('./routes/instructors');
const quizzesRouter = require('./routes/quizzes');
const finalRouter = require('./routes/finals');
const assessmentsRouter = require('./routes/assessments');


app.use(express.static('../Frontend/'));
//error handling

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', authenticateUser, coursesRouter);
app.use('/api/v1/students', authenticateUser,studentAuthentication, studentsRouter);
app.use('/api/v1/instructors', authenticateUser, instructorsRouter);
app.use('/api/v1/quizzes', authenticateUser,studentAuthentication, quizzesRouter);
app.use('/api/v1/finals', authenticateUser, finalRouter);
app.use('/api/v1/assessments', authenticateUser, assessmentsRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () =>
        console.log(`\nServer is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
};

start()  