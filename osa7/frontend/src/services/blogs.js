import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

function setToken(newToken) {
  if (!newToken)
    token = undefined;
  else
    token = 'Bearer ' + newToken;
}

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function create(blog) {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
}

async function like(blog) {
  const config = {
    headers: { Authorization: token },
  };
  const updatedBlog = {
    ...blog,
    user: undefined,
    likes: blog.likes + 1,
  };
  const response = await axios.put(baseUrl + '/' + blog.id, updatedBlog, config);
  return response.data;
}

async function deleteBlog(blog) {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(baseUrl + '/' + blog.id, config);
  return response.data;
}

async function addComment(blogId, comment) {
  const response = await axios.post(baseUrl + '/' + blogId + '/comments', { comment });
  return response.data;
}

export default {
  getAll,
  create,
  like,
  setToken,
  delete: deleteBlog,
  addComment,
};
