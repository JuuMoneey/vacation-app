
import React, { useEffect, useState } from 'react';
import './AfterLoginPage.css';
import Logo from './Logo.png';
import { Link } from 'react-router-dom';


const AfterLoginPage = ({ userProfile }) => {
  console.log(userProfile)
  //  const [pastTrips, setPastTrips] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  //  const [futureTrips, setFutureTrips] = useState ([]);
  //  const [bookingHistory, setBookingHistory] = useState ([]);
  // const [reviews, setReviews] = useState ([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3030/savedtrips")
      .then(res => res.json())
      .then(data => setSavedTrips([...data]))
      .catch(error => console.error('Error fetching data:', error))
  }





  return (
    <div>
      <p> Welcome {userProfile.givenName}</p>
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


    </div>

  )
}
export default AfterLoginPage;


