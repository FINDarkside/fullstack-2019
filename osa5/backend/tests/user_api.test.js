const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const userList = require('./util/userList');
const bcrypt = require('bcrypt');

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    for (const user of userList) {
        const b = new User(user);
        await b.save();
    }
});

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('returns correct amount of users', async () => {
    const res = await api.get('/api/users');
    expect(res.body.length).toBe(userList.length);
});

test('users contain id field', async () => {
    const res = await api.get('/api/users');
    res.body.forEach(b => expect(b.id).toBeDefined());
});

test('can add new user', async () => {
    const newUser = {
        username: 'Jesse',
        name: 'Jesse Niininen',
        password: 'superSecretPass',
    };
    await api.post('/api/users')
        .send(newUser)
        .expect(201);
    const blogs = await api.get('/api/users');
    expect(blogs.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ username: newUser.username, name: newUser.name })
        ])
    );
});

test('responds with 400 if username is not unique', async () => {
    await api.post('/api/users')
        .send({
            username: 'TestUser',
            name: 'Michael Bisping',
            password: 'something'
        })
        .expect(400);
});

test('responds with 400 if password is less than 3 characters', async () => {
    await api.post('/api/users')
        .send({
            username: 'LehitNewUser',
            name: 'Michael Bisping',
            password: ':('
        })
        .expect(400);
});

afterAll(() => {
    mongoose.connection.close()
});
