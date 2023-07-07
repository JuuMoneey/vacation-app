
import React, { useEffect, useState } from 'react';
import './AfterLoginPage.css';
import Logo from './Logo.png';
import { Link } from 'react-router-dom';


const AfterLoginPage = () => {
  return (
    <div>
     <p> Welcome "Username"</p>
     <div className='PastTrips'> 
     <h3>Past Trips</h3>
     <div>
     <img style={{width: '300px' }}src ='https://www.tripsavvy.com/thmb/hpnTljEZLnTCd2dzVRuSvxgdqUY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/view-of-city-lit-up-at-night-743766201-5b61ee4dc9e77c00501f73e1.jpg'/>
     <p>Miami,Florida</p>
     </div>
     <div>
     <img style={{width: '300px' }}src ='https://www.tripsavvy.com/thmb/hpnTljEZLnTCd2dzVRuSvxgdqUY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/view-of-city-lit-up-at-night-743766201-5b61ee4dc9e77c00501f73e1.jpg'/>
     <p>Miami,Florida</p>
     </div>
     {/* <PastTripsMap/> */}
     <button>Map View</button>
     <button>Add New</button>
     </div>
     <div className='Future Trips'>
     {/* <FutureTrips/> */}
     <h3>Future Trips</h3>
     <p>Plan Your Next Trip </p>
     </div>
    </div>
  )
}

export default AfterLoginPage