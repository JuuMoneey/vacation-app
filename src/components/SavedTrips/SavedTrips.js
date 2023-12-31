import React, { useState,useEffect } from 'react';

const SavedTrips = (props) => {
    const {userProfile,refreshData} =props;
    const [savedTrips, setSavedTrips] = useState([]);

    const apiEndpoint = 'd1768jeapet3h0.cloudfront.net'
    useEffect(() => {
          fetch(`http://${apiEndpoint}/getTripsbyuserid/${userProfile.googleId}`)
          .then((res) => res.json())
          .then(res => {
            setSavedTrips(res)
          })
        }, [refreshData]); 


        
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
    <div>
        <div className='singleTrip-container'>

{tripsArray.map((Trip) => (
     
   <div className='singleTrip-box'>
   <h4>{Trip.tripName}</h4>
  <p>Date:{Trip.date}</p>
  <p>Attractions planned for this trip:{Trip.attractions}</p>
  </div>
 ))}
 </div>
    </div>
  )
}

export default SavedTrips
