import React, { useState, useEffect } from "react";
import "../styles/WeatherPage.css";

const WeatherPage = () => {
  const [city, setCity] = useState("Colorado Springs");
  const [temperature, setTemperature] = useState(43);
  const [condition, setCondition] = useState("Cloudy, windy");
  const [alert, setAlert] = useState("Winter Storm Warning starting tomorrow");

  // Example forecast data
  const [forecast, setForecast] = useState([
    { condition: "Rain/Snow", high: 37, low: 19, icon: "wi-day-rain-mix" },
    { condition: "Snow", high: 29, low: 26, icon: "wi-snow" },
    { condition: "Snow", high: 27, low: 25, icon: "wi-snow" },
    { condition: "Sunny", high: 46, low: 15, icon: "wi-day-sunny" },
    { condition: "Windy", high: 65, low: 35, icon: "wi-windy" },
  ]);

  // Calculate days dynamically
  const [days, setDays] = useState([]);

  useEffect(() => {
    const getNextFiveDays = () => {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = new Date();
      const nextDays = [];

      for (let i = 1; i <= 5; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        nextDays.push(daysOfWeek[nextDay.getDay()]);
      }

      setDays(nextDays);
    };

    getNextFiveDays();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    // Add logic for fetching weather data based on the input city
  };

  return (
    <div className="weather-page">
      {/* Header */}
      <h1 className="title">
        THE <span className="highlight">WEATHER</span>
      </h1>
      <p className="tagline">for when you just need the weather</p>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Enter a city to see the weather"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Main Weather Card */}
      <div className="main-weather">
        <h2>{city}</h2>
        <i className="wi wi-cloudy"></i> {/* Weather icon */}
        <p className="condition">{condition}</p>
        <p className="temperature">{temperature}°</p>
        <div className="favorite">
          <span>❤️</span> {/* Heart icon */}
        </div>
      </div>

      {/* Extended Forecast */}
      <div> <h3>The Week Ahead</h3> </div>
      <div className="forecast-section">
        <div className="forecast-grid">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <h4>{days[index]}</h4>
              <i className={`wi ${day.icon}`}></i>
              <p>{day.condition}</p>
              <p>
                {day.high}°/{day.low}°
              </p>
            </div>
            
          ))}
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="weather-alerts">
        <p>
          Current Weather Alerts for {city}: <strong>{alert}</strong>
        </p>
      </div>

      

      
    </div>
  );
};

export default WeatherPage;
