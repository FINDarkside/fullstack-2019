import anecdoteService from '../services/anecdotes'

const initialState = []

const reducer = (state = initialState, action) => {
  console.log('State ', state)
  console.log('Action ', action)
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      return state.map(a => a.id !== action.data.id ? a : {
        ...a,
        votes: a.votes + 1
      })
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'SET_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create({ content, votes: 0 })
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdote
    })
  }
}

export const initAnecdotes = (content) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'SET_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.setAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: { id: anecdote.id }
    })
  }
}

export default reducer