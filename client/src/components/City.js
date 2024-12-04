import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

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
      <h1>City Names</h1>
      <ul>
        {cities.map((city, index) => (
          <ul key={index}>
            <Link to={`/weather/${city}`}>{city}</Link>
          </ul>
        ))}
      </ul>
    </div>
  )
}

export default City
