import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">
        THE <span className="highlight">WEATHER</span>
      </h1>
      <div className="weather-icons">
        <i className="wi wi-day-fog"></i>
        <i className="wi wi-day-rain"></i>
        <i className="wi wi-day-sunny"></i>
        <i className="wi wi-day-showers"></i>
        <i className="wi wi-windy"></i>
      </div>
      <div className="buttons">
        <Link to="/login" className="btn login-btn">Log In</Link>
        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
      </div>
      <p className="tagline">for when you just need the weather</p>
    </div>
  );
};

export default Home;
