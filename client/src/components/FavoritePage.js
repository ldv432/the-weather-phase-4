import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavoritePage = ({ userFavorites, handleNicknameReset }) => {

  const [edit, setEdit] = useState(null);
  const [newNickname, setNewNickname] = useState("");

  const handleEditClick = (favorite) => {
    setEdit(favorite.id); // Set the editing mode for this favorite
    setNewNickname(favorite.nickname || ""); // Pre-fill with existing nickname
  };

  const handleSaveClick = (favorite) => {
    updateNickname(favorite.id, newNickname); // Call function to save nickname
    setEdit(null); // Exit editing mode
    setNewNickname("");
  };

  const handleCancelClick = () => {
    setEdit(null); // Exit editing mode
    setNewNickname("");
  };

  const updateNickname = async (favoriteId, newNickname) => {
    try {
      const response = await fetch(`/favorites/${favoriteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: newNickname }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update nickname");
      }
  
      handleNicknameReset(favoriteId, newNickname)
      
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };
  

  return (
    <div>
        <h1 className="title">
        YOUR <span className="highlight">FAVORITES</span>
      </h1>
      <div className="city-buttons-grid">
      {userFavorites.map((favorite) => (
        <div key={favorite.id} className="favorite-item">
          <button className="cities-button">
            <Link to={`/weather/${favorite.city.name}`}>{favorite.city.name}</Link>
          </button>
          {edit === favorite.id ? (
            <div className="edit-nickname">
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder="Enter new nickname"
              />
              <button onClick={() => handleSaveClick(favorite)}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          ) : (
            <div className="nickname-container">
            <p className="nickname-text">
              {favorite.nickname || "No nickname"}{" "}
              <button
                className="edit-button"
                onClick={() => handleEditClick(favorite)}
              >
                ✏️
              </button>
            </p>
          </div>
          )}
        </div>
    
      ))}
      </div>
    </div>
  );
};

export default FavoritePage;
