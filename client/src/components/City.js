import React, { useEffect, useState } from "react";
import Link from "react-router-dom"
const City = () => {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch city names from the API
    const fetchCities = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/cities"); // Update with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        const data = await response.json();
        setCities(data); // Set the city names in state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCities();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>City Names</h1>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default City;
