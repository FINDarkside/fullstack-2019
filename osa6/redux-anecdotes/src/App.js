import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { connect } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = ({ initAnecdotes }) => {

  useEffect(() => {
    initAnecdotes()
  }, [initAnecdotes])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

const ConnectedApp = connect(null, { initAnecdotes })(App)
export default ConnectedApp
