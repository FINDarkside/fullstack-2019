const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs);
        });
});

blogsRouter.post('/', async (request, response, next) => {
    try {
        const blog = new Blog(request.body);

        const res = await blog.save();
        response.status(201).json(res);
    } catch (err) {
        next(err);
    }
});

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.deleteOne({ id: request.params.id });
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
        }
        const blog = await Blog.findByIdAndUpdate(request.params.id, blogData, { new: true });
        if (!blog)
            response.status(404).json({ err: 'User does not exist' });
        response.json(blog.toJSON());
    } catch (err) {
        next(err);
    }
});

module.exports = blogsRouter;
