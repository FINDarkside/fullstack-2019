import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { Query, Mutation } from 'react-apollo'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from './queries'
import { CREATE_BOOK, UPDATE_AUTHOR, LOGIN } from './mutations'
import { useApolloClient } from 'react-apollo'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('user-token'));
  const client = useApolloClient()

  if (page === 'login' && token)
    setPage('authors')

  const logout = () => {
    setToken(null);
    localStorage.removeItem('user-token');
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => (
          <Mutation mutation={UPDATE_AUTHOR} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
            {(updateAuthor) => (
              <Authors show={page === 'authors'} result={result} updateAuthor={updateAuthor} />
            )}
          </Mutation>
        )}
      </Query>

      <Query query={ALL_BOOKS}>
        {(result) => (
          <Query query={ALL_GENRES}>
            {(allGenresResult) => (
              <Books show={page === 'books'} result={result} allGenresResult={allGenresResult} client={client} />
            )}
          </Query>

        )}
      </Query>

      <Mutation mutation={CREATE_BOOK} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
        {(addBook) => (
          <NewBook show={page === 'add'} addBook={addBook} client={client} />
        )}
      </Mutation>

      <Mutation mutation={LOGIN}>
        {(login) => (
          <Login show={page === 'login'} login={login} setToken={setToken} />
        )}
      </Mutation>

      <Recommended show={page === 'recommendations'} client={client} />


    </div>
  )
}

export default App