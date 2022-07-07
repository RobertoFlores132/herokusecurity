const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.routes');
const { commentsRouter } = require('./routes/comments.routes');

//Global Error Handler
const { globalErrorHandler } = require('./controllers/error.controller')

//Utils
const { AppError } = require('./utils/appError.util')

// Init express app
const app = express();

//Limit the number of requests than can be accepted to our server
const limiter = rateLimit({
	max: 10000,
	windowMs: 60*60*1000, //1 min
	message: 'Number of requests have been exceeded'
});

app.use(limiter);

app.use(helmet());
app.use(compression());

//Log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));


//Enable incoming json
app.use(express.json());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/comments', commentsRouter);

//Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
	next(new AppError(`${req.method} ${req.originalUrl} not found in this server`, 404));
});

app.use(globalErrorHandler);

module.exports = { app };
