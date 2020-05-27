// const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
    // Log to console for dev
    console.log(err.stack.red);
    console.error(`err.name is ${err.name}`.bgRed);
    console.error(`err.code is ${err.code}`.bgRed);
    console.error(err);

    let error = { ...err };
    error.message = err.message;

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || `Server Error`
    });
};

module.exports = errorHandler;
