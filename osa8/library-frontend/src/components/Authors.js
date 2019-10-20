import React, { useState } from 'react'
import Select from 'react-select'

const Authors = ({ show, result, updateAuthor }) => {
  const [authorName, setAuthorName] = useState({});
  const [birthyear, setBirthyear] = useState('');

  const submit = (e) => {
    e.preventDefault()
    updateAuthor({
      variables: {
        name: authorName.value,
        birthyear: Number(birthyear),
      }
    });
    setAuthorName({})
    setBirthyear('')
  }

  if (!show) {
    return null
  }
  console.log(result);
  if (result.loading)
    return <div>Loading...</div>
  console.log(result);
  const authors = result.data.allAuthors;
  const authorOptions = authors.map(a => ({ value: a.name, label: a.name }));

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map(a =>
            <tr key={a._id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <Select value={authorName} onChange={o => setAuthorName(o)} options={authorOptions} />
        </div>
        <div>
          Birthyear
        <input type='number' value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>


    </div>
  )
}

export default Authors