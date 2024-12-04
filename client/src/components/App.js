import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import City from "./City";
import Login from "./Login";
import Signup from "./Signup";
import WeatherPage from "./WeatherPage"

import "weather-icons/css/weather-icons.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cities" element={<City />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/weather/:city" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
