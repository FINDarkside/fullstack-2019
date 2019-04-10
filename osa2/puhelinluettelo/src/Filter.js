import React from 'react';

const Filter = ({ search, setSearch }) => {
    return (
        <div>
            Rajaa näytettäviä <input value={search} onChange={(evt) => setSearch(evt.target.value)} />
        </div>
    )
}

export default Filter
