const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());
app.use(middleware.getTokenFromRequest);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const resetDb = require('./resetDb');
  app.post('/api/reset', async (req, res) => {
    resetDb()
      .then(() => res.status(200).end())
      .catch((err) => res.status(500).send(err));
  });
}

app.use(middleware.errorHandler);
const path = require('path')
app.use(function (req, res) {
  console.log(__dirname);
  res.sendFile(path.dirname(__dirname) + '/build/index.html');
});


module.exports = app;
