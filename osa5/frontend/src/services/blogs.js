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
};

async function create(blog) {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config);
  const response = await axios.post(baseUrl, blog, config);
  return response.data
};

export default { getAll, create, setToken };