import axios from 'axios';
const baseUrl = '/api/login';

async function login(username, password) {
  console.log('Login ', username, password)
  const response = await axios.post(baseUrl, { username, password });
  return response.data;
}

export default {
  login
}
