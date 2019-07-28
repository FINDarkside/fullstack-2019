const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');
const Blog = require('../src/models/Blog');
const blogList = require('./util/blogList');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    for (const blog of blogList) {
        const b = new Blog(blog);
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
        .send({
            author: 'Jesse',
            url: 'google.com',
        })
        .expect(400);
});

test('responds with 400 if blog does not have url field', async () => {
    await api.post('/api/blogs')
        .send({
            title: 'Mahtava kirja',
            author: 'Jesse',
        })
        .expect(400);
});

describe('deletion', () => {
    test('responds with 204 and deletes correct blog', async () => {
        const blogs = await api.get('/api/blogs');
        const blogsAfter = await api.delete(`/api/blogs/${blogs.body[0].id}`)
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
            .send(blogToEdit)
            .expect(200);
        expect(updateBlog.body).toEqual(blogToEdit);
    });
});

afterAll(() => {
    mongoose.connection.close()
});
