import React from 'react'

const Books = ({ show, result }) => {
  if (!show) {
    return null
  }

  if (result.loading)
    return <div>Loading...</div>
  const books = result.data.allBooks;
  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books