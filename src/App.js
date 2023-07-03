import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Locations from './components/locations/Locations';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script'
// import NavBar from './components/navBar/navBar'
import Login from './components/login/Login';
import Logout from './components/logout/logout'
import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Locations from './components/locations/Locations';

const clientId = '334215639628-vu09cfq9ob860n6hj48vosfsdl545reo.apps.googleusercontent.com';

function App() {
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    };
    gapi.load('client:auth2', start)
  });


  if (userProfile) {
    return (
      <div className="Vacation-App">
        {/* <NavBar/> */}
        <div className='container'>
          <h2>Welcome {userProfile.givenName}!</h2>
          <Logout userProfile={userProfile} setUserProfile={setUserProfile} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="Vacation-App">
          {/* <NavBar/> */}
          <div className='container'>
            <Login userProfile={userProfile} setUserProfile={setUserProfile} />
          </div>
        </div>
        <div className="routes">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/locations" element={<Locations />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;