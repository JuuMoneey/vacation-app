import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Locations from './components/locations/Locations';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </div>
  );
}

export default App;
