import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { connect } from 'react-redux'

const AnecdoteForm = ({ addAnecdote }) => {

  const add = async (evt) => {
    evt.preventDefault()
    const content = evt.target.content.value
    evt.target.content.value = ''
    addAnecdote(content)
  }

  return (
    <form onSubmit={add}>
      <h2>create new</h2>
      <div><input name="content" /></div>
      <button>create</button>
    </form>
  )
}

const ConnectedAnecdoteForm = connect(null, { addAnecdote })(AnecdoteForm)
export default ConnectedAnecdoteForm
