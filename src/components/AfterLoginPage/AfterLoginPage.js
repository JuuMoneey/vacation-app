import React from 'react';

const AfterLoginPage = () => {
  const username = "John Doe"; 

  // Sample data for past trips
  const pastTrips = [
    { destination: 'Miami, Florida', imageUrl: '' },
    { destination: 'Paris, France', imageUrl: '' },
  ];

  // Sample data for future trips
  const futureTrips = [
    { destination: 'Tokyo, Japan', date: '2023-08-15' },
    { destination: 'Sydney, Australia', date: '2023-10-20' },
  ];

  //Sample date for trip history
  const tripHistory = [
  {id:1, destination: 'New York, NY', date:'2023-05-20'},
  {id: 2, destination: 'London, UK', date:'2022-12-22'}
]
//Sample data for reviews
const reviews = [
  {id:1, trip: 'Miami, Florida', rating: 4, review: 'Great experience!'},
  {id: 2, trip: 'Paris, France', rating: 5, review: 'Absolutely loved it!'}
]


  return (
    <div>
      {/* <Navbar/> */}
      <nav className="Navbar">
        <ul className="Navbar_List">
          <li className="Navbar_Item">
            <a href="#home">Home</a>
          </li>
          <li className="Navbar_Item">
            <a href="#explore">Explore</a>
          </li>
          <li className="Navbar_Item">
            <a href="#bookings">Bookings</a>
          </li>
          <li className="Navbar_Item">
            <a href="#profile">Profile</a>
          </li>
        </ul>
      </nav>

      <p> Welcome {username}</p>
      <div className="UserProfile">
        <img src="" alt="Profile Picture" className="UserProfile_Picture" />
        <div className="UserProfile_Details">
          <h2 className="UserProfile_Name">{username}</h2>
        </div>
      </div>
     {/* <PastTripsMap/> */}
      <div className="PastTrips">
        <h3>Past Trips</h3>
        {pastTrips.map((trip, index) => (
          <div key={index}>
            <img style={{ width: '300px' }} src={trip.imageUrl} alt={trip.destination} />
            <p>{trip.destination}</p>
          </div>
        ))}
        <button>Map View</button>
        <button>Add New</button>
      </div>
     {/* <FutureTrips/> */}
      <div className="FutureTrips">
        <h3>Future Trips</h3>
        {futureTrips.map((trip, index) => (
          <div key={index}>
            <p>{trip.destination}</p>
            <p>Date: {trip.date}</p>
          </div>
        ))}
        <button>Plan Your Next Trip</button>
      </div>
      {/*Booking History */}
      <div className="TripHistory">
        <h3>Trip History</h3>
        <table>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Destination</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tripHistory.map((trip)=>(
              <tr key={trip.id}>
                <td>{trip.id}</td>
                <td>{trip.destination}</td>
                <td>{trip.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="Reviews">
        <h3>Reviews and Ratings</h3>
        {reviews.map((review) => (
          <div key={review.id}>
            <p>Trip: {review.trip}</p>
            <p>Rating: {review.rating}</p>
            <p>Review: {review.review}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default AfterLoginPage;


