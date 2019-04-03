import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const SearchResults = ({ matchingCountries, setSearch }) => {
    if (matchingCountries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (matchingCountries.length === 1) {
        const country = matchingCountries[0];
        return (
            <div>
                <h1>{country.name}</h1>
                <div>Capital: {country.capital}</div>
                <div>Population: {country.population}</div>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
                </ul>
                <img src={country.flag} alt={`${country.name} flag`} width="300" />
                <h3>Weather in {country.capital}</h3>
                <Weather city={country.capital} />
            </div>
        )
    }
    return (
        <div>
            {matchingCountries.map(c =>
                <div key={c.name}>
                    {c.name}
                    <button onClick={() => setSearch(c.name)}>Show</button>
                </div>
            )}
        </div>
    )
}

const Weather = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        (async () => {
            setWeatherData((await axios.get(`http://api.apixu.com/v1/current.json?key=58832b21fb3f47fca68165022190304&q=${city}`)).data)
        })()
    }, city)

    if (weatherData) {
        return (
            <div>
                <div>Temperature: {weatherData.current.temp_c} Celsius</div>
                <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} width="100" />
                <div>Wind: {weatherData.current.wind_kph} kph direction {weatherData.current.wind_dir}</div>
            </div>
        )
    }
    return <div></div>
}

const App = () => {
    const [search, setSearch] = useState('');
    const [countries, setCountries] = useState([]);
    const matchingCountries = countries.filter(c => c.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);

    useEffect(() => {
        (async () => {
            const res = await axios.get('https://restcountries.eu/rest/v2/all');
            setCountries(res.data);
        })()
    }, [])

    return (
        <div>
            <div>find countries <input value={search} onChange={(evt) => setSearch(evt.target.value)} /></div>
            <SearchResults matchingCountries={matchingCountries} setSearch={setSearch} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
