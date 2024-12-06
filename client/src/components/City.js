import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../styles/Cities.css"

const City = () => {
  const [cities, setCities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/cities")
        if (!response.ok) {
          throw new Error("Failed to fetch cities")
        }
        const data = await response.json()
        setCities(data) 
      } catch (err) {
        setError(err.message)
      }
    }
    fetchCities()
  }, [])

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>
      <h1 className="cities-title-text">CLICK ON A CITY FOR</h1>
        <h1 className="title">
        THE <span className="highlight">WEATHER</span>
      </h1>
      <div className="city-buttons-grid">
        {cities.map((city, index) => (
          <button className="cities-button" key={index}>
            <Link to={`/weather/${city}`}>{city}</Link>
          </button>
        ))}
      </div>
    </div>

  )
}

export default City
