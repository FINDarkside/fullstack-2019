import axios from 'axios'

async function getAll() {
  return axios.get('/anecdotes').then((res) => res.data)
}

async function create(anecdote) {
  return axios.post('/anecdotes', anecdote).then((res) => res.data)
}

async function setAnecdote(anecdote) {
  return axios.put('/anecdotes/' + anecdote.id, anecdote).then((res) => res.data)
}

export default {
  getAll,
  create,
  setAnecdote,
}