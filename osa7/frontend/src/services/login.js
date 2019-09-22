import axios from 'axios';
const baseUrl = '/api/login';

export async function login(username, password) {
  const response = await axios.post(baseUrl, { username, password });
  return response.data;
}
