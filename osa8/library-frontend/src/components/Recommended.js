import React, { useEffect, useState } from 'react'
import { ME, ALL_BOOKS } from '../queries'

const RecommendedBooks = ({ show, token, client }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchMe = async () => {
      const { data } = await client.query({
        query: ME
      });
      if (data.me)
        setFavoriteGenre(data.me.favoriteGenre);
    }
    fetchMe();
  }, [token])

  useEffect(() => {
    if (!favoriteGenre)
      return;
    const fetchBooksInGenre = async () => {
      const { data } = await client.query({
        query: ALL_BOOKS,
        variables: { genre: favoriteGenre }
      });
      setBooks(data.allBooks);
    }
    fetchBooksInGenre();
  }, [favoriteGenre])

  if (!show) {
    return null
  }
  if (!books)
    return <div>Loading...</div>

  return (
    <div>
      <h2>Recommendations</h2>
      <div>Books in your favorite genre {favoriteGenre}</div>
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

export default RecommendedBooks