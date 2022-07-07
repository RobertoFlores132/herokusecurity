const dotenv = require('dotenv');

const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './confidential.env' });

const sendErrorDev = (err, req, res) => {
	const statusCode = err.statusCode || 500;

	    res.status(statusCode).json({
		status: 'fail',
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

const sendErrorProd = (err, req, res) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		status: 'fail',
		message: err.message || 'Something weent wrong'
	});
};

const handleUniqueEmailError = () => {
	return new AppError('Email already in use', 400);
};

const handleJWTEpiredError = () => {
	return new AppError('Your session has expired, please login again', 401);
};

const handleJsonWebTokenError = () => {
	return new AppError('Invalid session, please login again', 401)
};

const globalErrorHandler = (err, req, res, next) => {
	

	if(process.env.NODE_ENV === 'development') {	
		sendErrorDev(err, req, res);
	} else if(process.env.NODE_ENV === 'production') {
		let error = { ...err };
		error.message = err.message;

		if (err.name === 'SequelizeUniqueConstraintError') {
			error = handleUniqueEmailError();
		} else if (err.name === 'TokenExpiredError') {
			error = handleJWTEpiredError();
		} else if (err.name === 'JsonWebTokenError') {
			error = handleJsonWebTokenError();
		}

		sendErrorProd(error, req, res);
	}
};

module.exports = { globalErrorHandler };