import React from 'react';
import AnecdoteForm from './AnecdoteForm';
import AnecdoteList from './AnecdoteList';

const App = ({ store }) => {
  return (
    <div>
      <AnecdoteList store={store} />
      <AnecdoteForm store={store} />
    </div>
  )
}

export default App