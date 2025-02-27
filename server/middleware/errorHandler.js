const createError = require('http-errors')

const notFoundHandler = (req, res, next) => {
    next(createError(404, 'Your requested content was not found'))
}

const errorHandler = (err, req, res, next) => {
    console.log(err.stack)
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        message: message
    })
}
module.exports = {
    errorHandler,
    notFoundHandler
}