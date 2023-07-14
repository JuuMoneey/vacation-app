import React, { useEffect, useState } from 'react';
import './AfterLoginPage.css';
import Logo from './Logo.png';
import { Link } from 'react-router-dom';
import { GrLocation } from 'react-icons/gr';
import { HiFilter } from 'react-icons/hi'
import Login from '../Login/Login';

const AfterLoginPage = ({ userProfile, video }) => {
   const [savedTrips, setSavedTrips] = useState([]);
  // const [destinations, setDestinations] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {

   

    fetch("http://localhost:3030/getTrips/1")
      .then(res => res.json())
      .then(data => setSavedTrips(data))
      .catch(error => console.error('Error fetching saved trips:', error));



  //   fetch('http://localhost:3030/destinations')
  //     .then(res => res.json())
  //     .then(data => setDestinations(data))
  //     .catch(error => console.error('Error fetching destinations:', error));
   };

  const handleOptionChange = option => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="WelcomeSection">
        <div className="UserProfile">
          <img
            src={userProfile.imageUrl}
            alt="Profile Picture"
            className="userProfile_Image"
          />
          <h3>Welcome, {userProfile.givenName}!</h3>
        </div>
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
      </div>
      <section className="afterlogin">
        <div className="overlay"></div>
        <video src={video} muted autoPlay loop type="video/mp4"></video>

        <div className="afterlogincontent container">
          <div className="textDiv">
            <span className="smallText"></span>
            <h1 className="afterLoginTitle">Search Your Next Trip</h1>
          </div>
          <div className="cardDiv grid">
            <div className="destinationInput">
              <label htmlFor="city">Search your destination:</label>
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
          <div className="priceInput">
            <div className="label_total.flex">
              <label htmlFor="price">Max price</label>
              <h3 className="total">$5000</h3>
            </div>
            <div className="input flex">
              <input type='range' max="5000" min="1000" />
            </div>
          </div>
          <div className="searchOptions flex">
            <HiFilter className='icon' />
            <span>More filters</span>
          </div>
        </div>
          </div>
      </section>
      <section className="savedTrips section">
        <h2>Saved Trips</h2>
        {savedTrips.map(trip => (
          <div key={trip.id} className="tripCard">
            <h3>{trip.name}</h3>
            <p>Date: {trip.date}</p>
          </div>
        ))}
      </section>

      {/* <div>
        <section className="destinations section">
          <div className="secTitle">
            <h3 className="title">
              Most visited destinations
          {destinations.map(destination => (
            <div key={destination.id} className="destinationsCard">
              <img
                src={destination.photo}
                alt={destination.name}
                className="DestinationImage"
              />
              <div className="DestinationDetails">
                <h3>{destination.name}</h3>
                <p>Country: {destination.country}</p>
              </div>
            </div>
          ))}
          </h3>
          </div>
          <div className="secContent grid">

          </div>
        </section>
        
      </div> */}
    </div>
  );
};

export default AfterLoginPage;
