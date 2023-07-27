import React, { useState,useEffect } from 'react';
import './AddTrip.css';
import SavedTrips from '../SavedTrips/SavedTrips';

const AddTrip = ({ userProfile}) => {
  const [tripName, setTripName] = useState('');
  const [userId, setUserId] = useState(userProfile.googleId);
  const [itemId, setItemId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [date, setDate] =useState('');  
  const [destinations, setDestinations] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  const [refreshData,setRefreshData] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3030/destinations`)
      .then((res) => res.json())
      .then(res => {
        setDestinations(res)
      })
    }, []); 


  const handleFormSubmit = (e) => {
    e.preventDefault();
        if (!destinationId) {
          alert('Destination required')
         return
        }
    
    const TripObject = {
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
      body: JSON.stringify(TripObject),
    })
      .then((res) => res.json())
      .then((data) => {
        setRefreshData(!refreshData);
        setDate("");
        setTripName('');
        setItemId('');
        setDestinationId("")
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const obj = savedTrips.reduce((acc, currentItem) => {
    const { name, attraction, date } = currentItem;
    const formattedDate = new Date(date).toLocaleDateString('en-US');
  
    if (!acc[name]) {
      acc[name] = {
        tripName:name,
        date: formattedDate,
        attractions: [attraction]
      };
    } else {
      acc[name].attractions.push(","+attraction);
    }
  
    return acc;
  }, {});

  const tripsArray =Object.values(obj)
  return (
    <div className='Addtrip' style={{background: '#3399ff'}}>
 <div className="ripple-background">
      <div className="circle xxlarge shade1"></div>
      <div className="circle xlarge shade2"></div>
      <div className="circle large shade3"></div>
      <div className="circle medium shade4"></div>
      <div className="circle small shade5"></div>
    </div>

<h4>Plan your next vacation</h4>
    <div className='form'>


      <form onSubmit={handleFormSubmit}>
        <label>Trip Name</label>
        <input
          type="text"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          required
        />
        <input
          type="hidden"
          value={userProfile.googleId}
        />
        <label>Destination</label>
        <select required onChange={(e) => setDestinationId(e.target.value)} value={destinationId}>
            <option defaultValue >Select a destination</option>
            {destinations.map(destination=><option key={destinationId} value={destination.id} >{destination.name}</option>)}
        </select>
       <label>Start date:</label>
        <input 
        type="date" 
        id="start"
        name="trip-start"
        value={date}
        min="2023-07-01" max="2030-12-31"
        onChange={(e) => setDate(e.target.value)}
        required
        />
            <button  className='button' type="submit">Submit</button>
      </form>
      </div>
      <h3>Saved trips </h3>
      <SavedTrips userProfile={userProfile} refreshData={refreshData}/>
    </div>
  );
};

export default AddTrip;
