import React, { useState } from 'react';
import Logo from './Logo.png';

const AddPastTrip = ({ refreshData }) => {
  const [tripName, setTripName] = useState('');
  const [userId, setUserId] = useState('');
  const [itemId, setItemId] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const pastTripObject = {
      trip_name: tripName,
      user_id: userId,
      item_id: itemId,
    };

    fetch('vacation-api/past-trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pastTripObject),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refreshData();
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
      <div className="top-bar">
        <button className="sign-in-button">Sign In</button>
        <button className="settings-button">Settings</button>
      </div>
      <div className="logo-container">
        <img className="logo" src={Logo} alt="Logo" />
      </div>

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
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <label>Item ID</label>
        <input
          type="text"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPastTrip;
