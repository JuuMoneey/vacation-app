import React from 'react';
import './Home.css';
import Logo from './Logo.png'
import { Link } from 'react-router-dom';
import Map from '../Map/Map'
import AfterLoginPage from '../AfterLoginPage/AfterLoginPage';

function Home({userProfile}){
  
  return (
    <div>
      {/* <div className="top-bar">
        <button className="sign-in-button">Sign In</button>
        <button className="settings-button">Settings</button>
      </div> */}
      {/* <div className="logo-container">
        <img className="logo" src={Logo} alt="Logo" />
      </div> */}
      <div className="home-page">
        {/* <h1 className="home-page-title">Travel App</h1> */}
        <AfterLoginPage userProfile={userProfile}/>
      </div>
      <Map />
    </div>
  );
}

export default Home;
