const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const { ObjectID } = require('mongodb');

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .populate('user', { id: 1, username: 1, name: 1 })
        .then(blogs => {
            response.json(blogs);
        });
});

blogsRouter.post('/', async (request, response, next) => {
    try {
        const decodedToken = request.decodedToken;
        if (!decodedToken)
            return response.status(403).json({ error: 'Invalid token' });

        const owner = await User.findById(decodedToken.id);
        const blog = new Blog({
            ...request.body,
            user: owner.id,
        });

        const res = await blog.save();
        owner.blogs.push(res.id);
        owner.save();
        response.status(201).json(res);
    } catch (err) {
        next(err);
    }
});

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = request.decodedToken;
        if (!decodedToken)
            return response.status(403).json({ error: 'Invalid token' });

        const blog = await Blog.findById(request.params.id);
        if (blog.user.toString() !== decodedToken.id)
            return response.status(403).json({ error: 'Cannot delete someone elses blog' });
        await Blog.findByIdAndDelete({ _id: request.params.id });
        response.status(204).end();
    } catch (err) {
        next(err);
    }
});

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const blogData = {
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
        };
        const blog = await Blog.findByIdAndUpdate(request.params.id, blogData, { new: true });
        if (!blog)
            response.status(404).json({ err: 'User does not exist' });
        response.json(blog.toJSON());
    } catch (err) {
        next(err);
    }
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
    try {
        const comment = request.body.comment;
        if (typeof comment !== 'string')
            throw new Error('Invalid comment');
        console.log(request.params.id);
        const a = await Blog.findOneAndUpdate(
            { _id: new ObjectID(request.params.id) },
            { $push: { comments: comment } },
        );
        return response.status(201).end();
    } catch (err) {
        next(err);
    }
});

module.exports = blogsRouter;
