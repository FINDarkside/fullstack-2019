const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
    User
        .find({})
        .populate('blogs', { id: 1, url: 1, title: 1, author: 1 })
        .then(blogs => {
            response.json(blogs);
        });
});

usersRouter.post('/', async (request, response, next) => {
    try {
        if (!request.body.password || request.body.password.length < 3)
            return response.status(403).json({ error: 'Password must be at least 3 characters long' });
        const userData = {
            ...request.body,
            passwordHash: await bcrypt.hash(request.body.password, 10),
            password: undefined,
        };
        const user = new User(userData);
        const res = await user.save();
        response.status(201).json(res);
    } catch (err) {
        next(err);
    }
});

module.exports = usersRouter;
