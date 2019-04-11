import React, { useState } from 'react';

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

export default PersonForm;