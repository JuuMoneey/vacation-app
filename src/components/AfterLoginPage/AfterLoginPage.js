import React, { useEffect, useState } from 'react';
import './AfterLoginPage.css';
import Logo from './Logo.png';
import { Link } from 'react-router-dom';

const AfterLoginPage = ({ userProfile }) => {
  const [savedTrips, setSavedTrips] = useState([]);
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3030/savedtrips")
      .then(res => res.json())
      .then(data => setSavedTrips(data))
      .catch(error => console.error('Error fetching saved trips:', error));

    fetch("http://localhost:3030/attractions")
      .then(res => res.json())
      .then(data => setAttractions(data))
      .catch(error => console.error('Error fetching attractions:', error));
  };

  return (
    <div>
      <p>Welcome {userProfile.givenName}</p>
      <div className="UserProfile">
        <img src={userProfile.imageUrl} alt="Profile Picture" className="userProfile_Image" />
        <div className="UserProfile_Details">
        </div>
      </div>

      <div>
        <h3>Saved Trips</h3>
        {savedTrips.map((trip, index) => (
          <div key={index}>
            <p>{trip.destination}</p>
            <p>Date: {trip.date}</p>
      
          </div>
        ))}
      </div>

      <div>
        <div className="Attractions">
          {attractions.map((attraction, index) => (
            <div key={index} className="Attraction">
              <img src={attraction.imageUrl} alt="Attraction" />
              <div className="AttractionDetails">
                <h3>{attraction.name}</h3>
                <p>Country: {attraction.country}</p>
                <p>Cost: {attraction.cost}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AfterLoginPage;
