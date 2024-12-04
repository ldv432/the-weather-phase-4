import React, { useState, useEffect } from "react";
import "../styles/WeatherPage.css";

const WeatherPage = () => {
  const [city, setCity] = useState("Colorado Springs");
  const [latitude, setLatitude] = useState(38.8339); // Default latitude
  const [longitude, setLongitude] = useState(-104.8214); // Default longitude
  const [temperature, setTemperature] = useState(null);
  const [condition, setCondition] = useState("");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // Weather condition to icon mapping
  const mapWeatherCodeToIcon = (code) => {
    const weatherIcons = {
      0: "wi-day-sunny", // Clear sky
      1: "wi-day-sunny-overcast", // Mainly clear
      2: "wi-day-cloudy", // Partly cloudy
      3: "wi-cloudy", // Overcast
      45: "wi-day-fog", // Fog
      48: "wi-fog", // Depositing rime fog
      51: "wi-sprinkle", // Drizzle: Light
      53: "wi-rain-mix", // Drizzle: Moderate
      55: "wi-showers", // Drizzle: Dense
      56: "wi-rain-mix", // Freezing drizzle: Light
      57: "wi-rain-mix", // Freezing drizzle: Dense
      61: "wi-rain", // Rain: Slight
      63: "wi-rain-wind", // Rain: Moderate
      65: "wi-rain", // Rain: Heavy
      66: "wi-rain-mix", // Freezing rain: Light
      67: "wi-rain-mix", // Freezing rain: Heavy
      71: "wi-snow", // Snow fall: Slight
      73: "wi-snow", // Snow fall: Moderate
      75: "wi-snow", // Snow fall: Heavy
      77: "wi-snowflake-cold", // Snow grains
      80: "wi-showers", // Rain showers: Slight
      81: "wi-rain", // Rain showers: Moderate
      82: "wi-rain-wind", // Rain showers: Violent
      85: "wi-snow", // Snow showers: Slight
      86: "wi-snow", // Snow showers: Heavy
      95: "wi-thunderstorm", // Thunderstorm: Slight or moderate
      96: "wi-thunderstorm", // Thunderstorm with slight hail
      99: "wi-thunderstorm", // Thunderstorm with heavy hail
    };
  
    return weatherIcons[code] || "wi-na";
  };
  

  // Fetch weather data from the API
  const fetchWeatherData = async (lat, lon) => {
    setIsLoading(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&temperature_unit=fahrenheit&current_weather=true&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      console.log("Request URL:", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched Data:", data);

      // Update state with the fetched data
      setTemperature(data.current_weather?.temperature ?? "N/A");
      setCondition(mapWeatherCodeToIcon(data.current_weather?.weathercode ?? 0));
      setForecast(
        data.daily.time.map((time, index) => ({
          date: time,
          icon: mapWeatherCodeToIcon(data.daily.weather_code[index]),
          high: data.daily.temperature_2m_max[index] ?? "N/A",
          low: data.daily.temperature_2m_min[index] ?? "N/A",
        }))
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false); // Stop loading
      console.log("Finished fetching weather data.");
    }
  };

  // Handle user search
  const handleSearch = async (event) => {
    event.preventDefault();
    setError(null);

    if (searchInput.trim()) {
      try {
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchInput.trim())}&language=en&count=1`
        );
        if (!geoResponse.ok) {
          throw new Error("Failed to fetch city coordinates");
        }

        const geoData = await geoResponse.json();
        console.log("Geocoding Response:", geoData);

        if (geoData.results && geoData.results.length > 0) {
          const { latitude, longitude, name } = geoData.results[0];
          setCity(name);
          setLatitude(parseFloat(latitude));
          setLongitude(parseFloat(longitude));
          await fetchWeatherData(parseFloat(latitude), parseFloat(longitude));
        } else {
          setError("City not found");
        }
      } catch (error) {
        console.error("Error during geocoding:", error);
        setError(error.message);
      }
    }
  };

  // Fetch default weather data on page load
  useEffect(() => {
    console.log("useEffect triggered on mount...");
    fetchWeatherData(latitude, longitude);
  }, []);

  return (
    <div className="weather-page">
      <h1 className="title">
        THE <span className="highlight">WEATHER</span>
      </h1>
      <p className="tagline">for when you just need the weather</p>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Enter a city to see the weather"
          className="search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <p className="error-text">Error: {error}</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="main-weather">
            <h2>{city}</h2>
            <i className={`wi ${condition} weather-icon`}></i>
            <p className="temperature">
              {temperature !== null ? `${parseInt(temperature)}°F` : "No data available"}
            </p>
          </div>

          <div>
            <h3>The Week Ahead</h3>
          </div>
          <div className="forecast-section">
            <div className="forecast-grid">
              {forecast.map((day, index) => (
                <div key={index} className="forecast-card">
                  <h4>
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </h4>
                  <i className={`wi ${day.icon} weather-icon`}></i>
                  <p>High: {parseInt(day.high)}°F</p>
                  <p>Low: {parseInt(day.low)}°F</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherPage;
