import React, { useRef } from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = ({ anecdotes, notification, setNotification, voteAnecdote, clearNotification }) => {

  const notificationRef = useRef(notification);
  notificationRef.current = notification;

  const vote = async (anecdote) => {
    await voteAnecdote(anecdote)
    setNotification(`You voted "${anecdote.content}"`, 3000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes
    .filter(a => a.content.includes(state.filter.value))
    .sort((a, b) => b.votes - a.votes),
  notification: state.notification
})

const mapDispatchToProps = { setNotification, clearNotification, voteAnecdote }

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
