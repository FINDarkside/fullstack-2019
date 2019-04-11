import React from 'react';

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

export default Persons;