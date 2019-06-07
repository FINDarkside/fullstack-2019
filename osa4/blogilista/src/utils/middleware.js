function errorHandler(error, request, response, next) {
    if (process.env.NODE_ENV !== 'test')
        console.error(error.message);
    if (response.headersSent) {
        return next(error);
    }
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message });
    } else {
        return response.status(500).send({ error: error.message });
    }
};

module.exports = {
    errorHandler,
}