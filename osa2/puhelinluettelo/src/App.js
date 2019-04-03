import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({ persons, removePerson }) => {
  return (
    <div>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.number}
          <button onClick={() => removePerson(p)}>Delete</button>
        </div>

      )}

    </div>
  )
}

const App = () => {

  useEffect(() => {
    (async () => {
      const res = await personService.getAll();
      console.log(res);
      setPersons(res.data);
    })()
  }, [])
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  console.log(persons);
  const matchingPersons = persons.filter(p => p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)

  const addPerson = (newPerson) => {
    const match = persons.find(p => p.name === newPerson.name)
    if (match) {
      if (window.confirm(`${newPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        personService.update(match.id, newPerson).then((res) => {
          setPersons(persons.map(p => p.id === match.id ? res.data : p))
        })
      }
      return;
    }
    personService.create(newPerson).then((res) => {
      setPersons([
        ...persons,
        res.data
      ])
    })
  }

  const removePerson = (person) => {
    if (window.confirm(`Poistetaanko henkilo ${person.name}`)) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter search={search} setSearch={setSearch} />
      <h3>Lisää henkilö</h3>
      <PersonForm addPerson={addPerson} />
      <h2>Numerot</h2>
      <Persons persons={matchingPersons} removePerson={removePerson} />
    </div>
  )

}

export default App
