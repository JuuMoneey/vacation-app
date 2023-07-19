import React from 'react';
import './Home.css';
import Logo from './Logo.png'
import { Link } from 'react-router-dom';
import Map from '../Map/Map'
import AfterLoginPage from '../AfterLoginPage/AfterLoginPage';

function Home({userProfile}){
  
  return (
    <div>
      <div className="logo-container">
        <img className="logo" src={Logo} alt="Logo" />
      </div>
      <div className="home-page">
        <AfterLoginPage userProfile={userProfile}/>
      </div>
      <Map />
    </div>
  );
}

export default Home;
