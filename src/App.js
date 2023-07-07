import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Components/home/Home';
import Locations from './Components/locations/Locations';
import Searchbar from './Components/Searchbar/searchbar'

function App() {
  return (
    <div className="App">
      <Searchbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </div>
  );
}

export default App;
