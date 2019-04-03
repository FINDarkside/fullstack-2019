import React, { useState } from 'react'

const Filter = ({ search, setSearch }) => {
  return (
    <div>
      Rajaa näytettäviä <input value={search} onChange={(evt) => setSearch(evt.target.value)} />
    </div>
  )
}

const PersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onSubmit = (evt) => {
    evt.preventDefault();
    addPerson({ name: newName, number: newNumber })
    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        nimi: <input onChange={(evt) => setNewName(evt.target.value)} value={newName} />
      </div>
      <div>
        numero: <input onChange={(evt) => setNewNumber(evt.target.value)} value={newNumber} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form >
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0123-123123' },
    { name: 'Arto Rellas', number: '0123-123123' },
    { name: 'Mauri Hellas', number: '0123-123123' },
    { name: 'Joku muu', number: '0123-333333' }
  ])
  const [search, setSearch] = useState('')

  const matchingPersons = persons.filter(p => p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)

  const addPerson = (newPerson) => {
    if (persons.some(p => p.name === newPerson.name)) {
      alert(`${newPerson.name} on jo luettelossa`);
      return;
    }
    setPersons([
      ...persons,
      newPerson
    ])
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter search={search} setSearch={setSearch} />
      <h3>Lisää henkilö</h3>
      <PersonForm addPerson={addPerson} />
      <h2>Numerot</h2>
      <Persons persons={matchingPersons} />
    </div>
  )

}

export default App
