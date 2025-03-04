import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const capital = country.capital[0]

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
        )
        setWeather(response.data)
      } catch (error) {
        console.error('error getting weather:', error)
      }
    }

    fetchWeather()
  }, [capital])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {capital}</p>
      <p>Area:{country.area} km^2</p>
      <h3>Langusges:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png}/>

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>temperature: {weather.main.temp} celsius</p>
          <p>wind: {weather.wind.speed} m/s</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
        </div>
      )}
    </div>
  )
}

export default Country