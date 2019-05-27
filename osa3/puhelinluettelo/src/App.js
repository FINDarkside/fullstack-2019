import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import NoficationBar from './NotificationBar';
import Filter from './Filter';
import Persons from './Persons';
import PersonForm from './PersonForm';

const notificationTimeout = 2000;

const App = () => {

  const [persons, setPersons] = useState([])
  const [notifications, setNotifications] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    (async () => {
      const res = await personService.getAll();
      console.log(res);
      setPersons(res.data);
    })()
  }, [])

  const matchingPersons = persons.filter(p => p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)

  const addPerson = async (newPerson) => {
    const match = persons.find(p => p.name === newPerson.name)
    if (match) {
      if (window.confirm(`${newPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        try {
          const res = await personService.update(match.id, newPerson)
          setPersons(persons.map(p => p.id === match.id ? res.data : p))
          createNotification(`Päivitettiin henkilön ${newPerson.name} numero`, true)
        } catch (err) {
          createNotification(`Henkilö ${newPerson.name} on jo poistettu `, false)
        }
      }
      return;
    }
    try {
      const res = await personService.create(newPerson)
      console.log(res.data)
      setPersons([
        ...persons,
        res.data
      ])
      createNotification(`Lisättiin ${newPerson.name}`, true)
    } catch (err) {
      console.log(err.response)
      if (err.response)
        createNotification(`Käyttäjän lisääminen epäonnistui: ${err.response.data.error}`, false)
      else
        createNotification(`Käyttäjän lisääminen epäonnistui: ${err.message}`, false)
    }
  }

  const removePerson = async (person) => {
    if (window.confirm(`Poistetaanko henkilo ${person.name}`)) {
      try {
        await personService.remove(person.id)
        setPersons(persons.filter(p => p.id !== person.id))
        createNotification(`Poistettiin ${person.name}`, true)
      } catch (err) {
        createNotification(`Henkilö ${person.name} on jo poistettu `, false)
      }
    }
  }

  const createNotification = (message, success) => {
    const notification = { message, success }
    setNotifications([...notifications, notification])
    setTimeout(() => removeNotification(notification), notificationTimeout)
  }

  const removeNotification = (obj) => {
    setNotifications(notifications.filter(o => o !== obj))
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <NoficationBar notifications={notifications} />
      <Filter search={search} setSearch={setSearch} />
      <h3>Lisää henkilö</h3>
      <PersonForm addPerson={addPerson} />
      <h2>Numerot</h2>
      <Persons persons={matchingPersons} removePerson={removePerson} />
    </div>
  )

}

export default App
