const jwt = require('jsonwebtoken');

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

function getTokenFromRequest(request, response, next) {
    const authorization = request.get('authorization');
    if (!authorization || !authorization.toLowerCase().startsWith('bearer '))
        return next();
    const token = authorization.substring(7);
    const decodedToken = jwt.decode(token);
    if (!jwt.verify(token, process.env.JWT_SECRET) || !decodedToken.id)
        return next();
    request.decodedToken = decodedToken;
    next();
}

module.exports = {
    errorHandler,
    getTokenFromRequest
}