import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup





const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <input 
        type="text"
        value={search}
        onChange={handleSearch}
      />

      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3}>
              {country.name.common} 
              <button onClick={()=> setSelectedCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      ) : filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        <p>nothing found</p>
      )}

      {selectedCountry && <Country country={selectedCountry} />}
    </div>
  )
}

export default App


