import React from 'react';
import { addAnecdote } from './reducers/anecdoteReducer';

const AnecdoteForm = ({ store }) => {

  const add = (evt) => {
    evt.preventDefault()
    const content = evt.target.content.value
    store.dispatch(addAnecdote(content))
    evt.target.content.value = ''
  }

  return (
    <form onSubmit={add}>
      <h2>create new</h2>
      <div><input name="content" /></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
