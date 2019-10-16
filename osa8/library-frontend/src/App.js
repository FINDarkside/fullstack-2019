import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Query, Mutation } from 'react-apollo'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { CREATE_BOOK, UPDATE_AUTHOR } from './mutations'

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => (
          <Mutation mutation={UPDATE_AUTHOR}>
            {(updateAuthor) => (
              <Authors show={page === 'authors'} result={result} updateAuthor={updateAuthor} />
            )}
          </Mutation>
        )}
      </Query>

      <Query query={ALL_BOOKS}>
        {(result) => (
          <Books show={page === 'books'} result={result} />
        )}
      </Query>

      <Mutation mutation={CREATE_BOOK}>
        {(addBook) => (
          <NewBook show={page === 'add'} addBook={addBook} />
        )}
      </Mutation>


    </div>
  )
}

export default App