require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./modules/pool');
const passport = require('./strategies/user.strategy');

const app = express();
const PORT = process.env.PORT || 5008;

// Use CORS with credentials for frontend
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

// Session middleware (connected to PostgreSQL)
const sessionMiddleware = session({
    store: new pgSession({
        pool: pool,
        tableName: 'session',
    }),
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false, // true if using HTTPS
    },
});

// Middleware Order Matters!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Route imports
const userRouter = require('./routes/user.router');
const jobsRouter = require('./routes/jobs.router');
const statesRouter = require('./routes/states.router');
const savedJobsRouter = require('./routes/savedJobs.router');
const appliedJobsRouter = require('./routes/appliedJobs.router');
const applicationRouter = require('./routes/application.router');

// Apply routes
app.use('/api/user', userRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/states', statesRouter);
app.use('/api/saved-jobs', savedJobsRouter);
app.use('/api/applied-jobs', appliedJobsRouter);
app.use('/api', applicationRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
