import React, { useState } from 'react'

export default function Search({ onClear, onSearch }) {

    const [ query, setQuery ] = useState('');

    function handleClear() {
        setQuery('');
        onSearch('');
    }

    return (
        <div className="search">
            <label htmlFor="query">Search: </label>
            <input 
                type="text" 
                name="query" 
                id="query" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleClear}>Clean</button>
            <button onClick={() => onSearch(query)}>Search</button>
        </div>
    )
}
