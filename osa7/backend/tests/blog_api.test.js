const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');
const Blog = require('../src/models/Blog');
const User = require('../src/models/User');
const blogList = require('./util/blogList');
const userList = require('./util/userList');
const jwt = require('jsonwebtoken');

const api = supertest(app);

let token = jwt.sign({
    username: 'TestUser',
    id: '5a422a851b54a676234d17f7'
}, process.env.JWT_SECRET);
beforeEach(async () => {
    await Blog.deleteMany({});
    for (const blog of blogList) {
        const b = new Blog(blog);
        await b.save();
    }
    await User.deleteMany({});
    for (const user of userList) {
        const b = new User(user);
        await b.save();
    }
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('returns correct amount of blogs', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body.length).toBe(blogList.length);
});

test('blogs contain id field', async () => {
    const res = await api.get('/api/blogs');
    res.body.forEach(b => expect(b.id).toBeDefined());
});

test('can add new blog', async () => {
    const newBlog = {
        title: 'Mahtava kirja',
        author: 'Jesse',
        url: 'google.com',
        likes: 0
    };
    await api.post('/api/blogs')
        .set('authorization', 'bearer ' + token)
        .send(newBlog)
        .expect(201);
    const blogs = await api.get('/api/blogs');
    expect(blogs.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining(newBlog)
        ])
    );
});

test('blog likes defaults to 0', async () => {
    const newBlog = {
        title: 'Mahtava kirja',
        author: 'Jesse',
        url: 'google.com',
    };
    await api.post('/api/blogs')
        .set('authorization', 'bearer ' + token)
        .send(newBlog)
        .expect(201);
    newBlog.likes = 0;
    const blogs = await api.get('/api/blogs');
    expect(blogs.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining(newBlog)
        ])
    );
});

test('responds with 400 if blog does not have title field', async () => {
    await api.post('/api/blogs')
        .set('authorization', 'bearer ' + token)
        .send({
            author: 'Jesse',
            url: 'google.com',
        })
        .expect(400);
});

test('responds with 400 if blog does not have url field', async () => {
    await api.post('/api/blogs')
        .set('authorization', 'bearer ' + token)
        .send({
            title: 'Mahtava kirja',
            author: 'Jesse',
        })
        .expect(400);
});

describe('deletion', () => {
    test('responds with 204 and deletes correct blog', async () => {
        const blogs = await api.get('/api/blogs');
        const blogsAfter = await api
            .delete(`/api/blogs/${blogs.body[0].id}`)
            .set('authorization', 'bearer ' + token)
            .expect(204);
        expect(blogsAfter.body).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining(blogs.body[0])
            ])
        );
    });
});

describe('updating', () => {
    test('updates correct blog', async () => {
        const blogs = (await api.get('/api/blogs')).body;
        const blogToEdit = blogs[0];
        blogToEdit.likes++;
        blogToEdit.author += 'a';
        blogToEdit.title += 'a';
        blogToEdit.url += 'a';
        const updateBlog = await api.put(`/api/blogs/${blogToEdit.id}`)
            .set('authorization', 'bearer ' + token)
            .send(blogToEdit)
            .expect(200);
        delete updateBlog.body.user;
        delete blogToEdit.user;
        expect(updateBlog.body).toEqual(blogToEdit);
    });
});

describe('adding comments', () => {
    test('work', async () => {
        let blogs = (await api.get('/api/blogs')).body;
        const blogToEdit = blogs[0];
        await api.post(`/api/blogs/${blogToEdit.id}/comments`)
            .send({ comment: 'asdasd' })
            .expect(201);
        blogs = (await api.get('/api/blogs')).body;
        expect(blogs.find(b => b.id === blogToEdit.id).comments).toContain('asdasd');
    });
});

afterAll(() => {
    mongoose.connection.close()
});
