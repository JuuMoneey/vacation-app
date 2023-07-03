import React from 'react';
import './home.css';
import Logo from './Logo.png';

function Home() {
  return (
    <div>
      <div className="top-bar">
        <button className="sign-in-button">Sign In</button>
        <button className="settings-button">Settings</button>
      </div>
      <div className="logo-container">
        <img className="logo" src={Logo} alt="Logo" />
      </div>
      <div className="home-page">
        <h1 className="home-page-title">Travel App</h1>
        <button className="home-page-button">Travel Log</button>
        <button className="home-page-button">Discover</button>
      </div>
    </div>
  );
}

export default Home;
