const User = require('./models/User');
const Blog = require('./models/Blog');
const blogList = require('../tests/util/blogList');
const userList = require('../tests/util/userList');

module.exports = async function resetDb() {
  await Promise.all([
    User.deleteMany({}),
    Blog.deleteMany({})
  ]);
  const promises = [];
  blogList.forEach(b => promises.push(new Blog(b).save()))
  userList.forEach(u => promises.push(new User(u).save()))
  return Promise.all(promises);
}
