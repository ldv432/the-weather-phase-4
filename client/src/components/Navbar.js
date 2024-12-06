import React from 'react'
import { useNavigate } from 'react-router-dom'
import  "../styles/WeatherPage.css";

const Navbar = ( {currentUser, handleLogout } ) => {
    const navigate = useNavigate()

  return (
    <nav className="navbar">
    <button className="nav-button" onClick={() => navigate("/home")}>
      Home
    </button>
    {!currentUser &&<>
    <button className="nav-button" onClick={() => navigate("/login")}>
      Login
    </button>
    <button className="nav-button" onClick={() => navigate("/signup")}>
      Signup
    </button>
    </>}
    {currentUser &&<>
    <button className="nav-button" onClick={() => navigate("/cities")}>
    Cities
    </button>
    <button className="nav-button" onClick={() => navigate("/favorites")}>
    Favorites
    </button>
    <button
    className="nav-button"
    onClick={async () => {
        await handleLogout()
        navigate("/home")
    }}
>
  Log Out
</button>
    </>}

  </nav>
  )
}

export default Navbar
