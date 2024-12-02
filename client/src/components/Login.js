import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css"; // Assuming your CSS file

const Login = () => {
  return (
    <div className="login-container">

      {/* Title and Tagline */}
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
      {/* Login Form */}
      <form className="login-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="enter your email"
            className="input-field"
          />
          <p className="helper-text">
            Don't have an account? <Link to="/signup">Click here to sign up</Link>
          </p>
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="enter your password"
            className="input-field"
          />
          <p className="helper-text">
            <Link to="/reset-password">Click here to change your password</Link>
          </p>
        </div>
        <div className="button-group">
          <button type="submit" className="btn login-btn">
            Sign In
          </button>
          <Link to="/home" className="btn back-btn">
            Go Back
          </Link>
        </div>
        <p className="tagline">for when you just need the weather</p>
      </form>
    </div>
  );
};

export default Login;
