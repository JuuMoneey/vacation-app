import React, { useEffect, useState } from 'react';
import './AfterLoginPage.css';
import Logo from './Logo.png';
import { Link } from 'react-router-dom';
import { GrLocation } from 'react-icons/gr';
import { HiFilter } from 'react-icons/hi'
import Login from '../Login/Login';
import Video from '../../Video/Afterimage.mp4'
import Images from '../../Images/bali.jpg'

const AfterLoginPage = ({ userProfile}) => {
   const [savedTrips, setSavedTrips] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {

   

    fetch("http://localhost:3030/getTrips/1")
      .then(res => res.json())
      .then(data => setSavedTrips(data))
      .catch(error => console.error('Error fetching saved trips:', error));
   };

  const handleOptionChange = option => {
    setSelectedOption(option);
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
      <div className="afterlogin-cardDiv">
        <div className="destinationInput">
          <label htmlFor="city">Search your past trips:</label>
          <div className="input flex">
            <input type="text" placeholder="Enter here..." />
            <GrLocation className="icon" />
          </div>
        </div>
        <div className="dateInput">
          <label htmlFor="date">Select your date</label>
          <div className="input flex">
            <input type="date" />
          </div>
        </div>
      <section className="savedTrips section">
        <h2>Saved Trips</h2>
        {savedTrips.map(trip => (
          <div key={trip.id} className="tripCard">
            <h3>{trip.name}</h3>
            <p>Date: {trip.date}</p>
            <div className="imageDiv">
                <img src={Images} alt={trip.name} />
              </div>
            </div>
      
        ))}
        <div className="DropdownMenu">
          <select
            value={selectedOption}
            onChange={e => handleOptionChange(e.target.value)}
          >
            <option value="">Select</option>
            <option value="booking">Booking History</option>
            <option value="past">Past Trips</option>
            <option value="saved">Saved Trips</option>
          </select>
        </div>
      </section>
        
      </div>
    </div>
  </div>
);
};

export default AfterLoginPage;