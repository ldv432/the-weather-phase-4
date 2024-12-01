import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Cities from "./cities";


function App() {
  return (
    <div className="App">
      <h1>Welcome to the City List</h1>
      <Cities />
    </div>
  )
}

export default App;
