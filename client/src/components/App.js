import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import City from "./City";
import Login from "./Login";
import Signup from "./Signup";
import WeatherPage from "./WeatherPage";
import FavoritePage from "./FavoritePage";
import toast, { Toaster } from "react-hot-toast";

//useContext() ==> a way to set "global" state

import "weather-icons/css/weather-icons.css";
import Navbar from "./Navbar";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  

  const updateCurrentUser = (value) => setCurrentUser(value);

  const addNewFavorite = (favorite) => {
    setUserFavorites((currentFavorites) => [...currentFavorites, favorite]);
  };

  const handleNicknameReset = (userFavorite_id, newNickname) => setUserFavorites(current => current.map(userFav => userFavorite_id === userFav.id ? {...userFav, nickname: newNickname} : userFav))

  const deleteFavorite = (favoriteId) => {
    setUserFavorites((currentFavorite) =>
      currentFavorite.filter((fav) => {
        return favoriteId !== fav.id;
      })
    );
  };
  const checkCityFavorite = (cityName) => {
    // debugger
    return userFavorites.find((userFav) => userFav.city.name === cityName);
  };

  useEffect(() => {
    fetch("/current-user").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setCurrentUser(data);
          setUserFavorites(data.favorites);
        });
      } else {
        res.json().then((obj) => toast.error(obj.error));
      }
    });
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "DELETE",
        credentials: "include", // Ensures session cookie is sent
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      // Clear user data
      setCurrentUser(null);
      console.log("Successfully logged out!");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  return (
    <>
      <Router>
        <Navbar currentUser={currentUser} handleLogout={handleLogout} />
        <Toaster />
        <Routes>
          <Route path="/home" element={<Home currentUser={currentUser} />} />
          <Route path="/cities" element={<City />} />
          <Route
            path="/favorites"
            element={
              <FavoritePage
                userFavorites={userFavorites}
                handleNicknameReset={handleNicknameReset}
              />
            }
          />
          {!currentUser && (
            <>
              <Route
                path="/login"
                element={<Login updateCurrentUser={updateCurrentUser} />}
              />
              <Route
                path="/signup"
                element={<Signup updateCurrentUser={updateCurrentUser} />}
              />
            </>
          )}
          <Route
            path="/weather"
            element={
              <WeatherPage
                currentUser={currentUser}
                addNewFavorite={addNewFavorite}
                deleteFavorite={deleteFavorite}
                userFavorites={userFavorites}
                checkCityFavorite={checkCityFavorite}
              />
            }
          />
          <Route
            path="/weather/:city"
            element={
              <WeatherPage
                currentUser={currentUser}
                addNewFavorite={addNewFavorite}
                deleteFavorite={deleteFavorite}
                userFavorites={userFavorites}
                checkCityFavorite={checkCityFavorite}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
