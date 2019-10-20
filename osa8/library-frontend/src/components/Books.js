import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, client, allGenresResult }) => {
  const [selectedGenre, setGenre] = useState({ value: null, label: 'ALL' })
  const [books, setBooks] = useState([])
  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await client.query({
        query: ALL_BOOKS,
        variables: { genre: selectedGenre.value }
      });
      console.log(data)
      setBooks(data.allBooks);
    }
    fetchBooks();
  })


  if (!show) {
    return null
  }

  if (allGenresResult.loading)
    return <div>Loading...</div>

  const genres = allGenresResult.data.allGenres;
  const genreOptions = [{ value: null, label: 'ALL' }, ...genres.map(s => ({ value: s, label: s }))];

  return (
    <div>
      <h2>Books</h2>
      <div>
        Genre:
          <Select value={selectedGenre} onChange={o => setGenre(o)} options={genreOptions} />
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map(a =>
            <tr key={a._id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books