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
import Attractions from './components/Attractions/Attractions'
import Profile from './components/profile/profile';
import Searchbar from './components/Searchbar/searchbar'
import AfterLoginPage from './components/AfterLoginPage/AfterLoginPage'

const clientId = '334215639628-vu09cfq9ob860n6hj48vosfsdl545reo.apps.googleusercontent.com';

function App() {
  const [userProfile, setUserProfile] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    };
    gapi.load('client:auth2', start)
  });


if(userProfile){
  return (
  <div className="Vacation-App">
  {/* <NavBar/> */}
  <div className='container'>
  <h2>Welcome {userProfile.givenName}!</h2>
  <AfterLoginPage/>
    <Logout userProfile={userProfile} setUserProfile={setUserProfile}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/Attractions" element={<Attractions />} />
      </Routes>
  </div>
 </div>
 );
}else{
  return (
    <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
          <Login userProfile={userProfile} setUserProfile={setUserProfile} user={user} setUser={setUser}/>
    </div>
  );
  }
}

export default App;