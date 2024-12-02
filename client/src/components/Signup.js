import React from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {
  return (
    <div className="signup-container">
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

      <form className="signup-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="enter an e-mail"
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="create a username"
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="create a password"
            className="input-field"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn signup-btn">Sign Up</button>
          <Link to="/home" className="btn back-btn">Go Back</Link>
        </div>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" />
            subscribe to weather alerts to your e-mail
          </label>
          <label>
            <input type="checkbox" />
            subscribe to our weekly newsletter
          </label>
        </div>
      </form>
      <p className="tagline">for when you just need the weather</p>
    </div>
  );
};

export default Signup;
