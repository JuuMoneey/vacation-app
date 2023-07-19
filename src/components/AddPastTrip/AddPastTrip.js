import React, { useState,useEffect } from 'react';
import Logo from './Logo.png';

const AddPastTrip = ({ userProfile}) => {
  const [tripName, setTripName] = useState('');
  const [userId, setUserId] = useState(userProfile.googleId);
  const [itemId, setItemId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [date, setDate] =useState('');  
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3030/destinations`)
      .then((res) => res.json())
      .then(res => {
        setDestinations(res)
      })
  }, []); 

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const pastTripObject = {
      name: tripName,
      user_id: userId,
      destination_id: destinationId,
      date
    };

    fetch('http://localhost:3030/saved_trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pastTripObject),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDate("");
        setTripName('');
        setUserId('');
        setItemId('');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <div>
<p>{userProfile.name}</p>

      <form onSubmit={handleFormSubmit}>
        <label>Trip Name</label>
        <input
          type="text"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
        />

        <label>User ID</label>
        <input
          type="text"
          value={userProfile.googleId}
        />

        <label>Destination</label>
        <select onChange={(e) => setDestinationId(e.target.value)} value={destinationId}>
            <option defaultValue>Select an Option</option>
            {destinations.map(destination=><option key={destinationId} value={destination.id}>{destination.name}</option>)}
        </select>

   
       <label>Start date:</label>
        <input 
        type="date" 
        id="start"
        name="trip-start"
        value={date}
        min="2023-07-01" max="2030-12-31"
        onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPastTrip;
