import React, { useEffect, useState } from 'react';
import './AfterLoginPage.css';
import Logo from './Logo.png';
import { Link } from 'react-router-dom';
import { HiFilter } from 'react-icons/hi'
import Login from '../Login/Login';
import Video from '../../Video/Afterimage.mp4'
import SavedTrips from '../SavedTrips/SavedTrips';

const AfterLoginPage = ({ userProfile}) => {
   const [savedTrips, setSavedTrips] = useState([]);
   const apiEndpoint = 'ec2-34-238-40-148.compute-1.amazonaws.com'

  useEffect(() => {
    fetchData();
  }, [userProfile.googleId]);

  const fetchData = () => {

   

    fetch(`http://${apiEndpoint}:3030/getTrips/1`)
      .then(res => res.json())
      .then(data => setSavedTrips(data))
      .catch(error => console.error('Error fetching saved trips:', error));
   };



  return (
    <div className="afterlogin-container">
    <video className="afterlogin-video" src={Video} muted autoPlay loop type="video/mp4"></video>
    <div className="afterlogin-overlay"></div>
    <div className="afterlogin-content">
      <div className="WelcomeSection">
        <div className="UserProfile">
          <img
            src={userProfile.imageUrl}
            alt="Profile Picture"
            className="userProfile_Image"
          />
          <h3>Welcome, {userProfile.givenName}!</h3>
        </div>
      </div>
      <section className="home">
      <div className="secContainer container">
        <div className="homeText">
          <h1 className="title">Let Your Travel Story Begin Here</h1>
          <p className="subTitle">Travel to your next destination!</p>
          <Link to="/map" className="btn btn-primary">Explore Now
          </Link>
        </div>
      </div>
    </section>
      
      <section className="savedTrips section">
        {/* <h2>Saved Trips</h2> */}
        {savedTrips.map(trip => (
          <div key={trip.id} className="tripCard">
            <h3>{trip.name}</h3>
            <p>Date: {trip.date}</p>
            </div>
      
        ))}
       
      <SavedTrips userProfile={userProfile} />
      </section>
        
      
    </div>
  </div>
);
};

export default AfterLoginPage;