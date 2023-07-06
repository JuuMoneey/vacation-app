// import logo from './logo.svg';
import React from 'react';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script'
import './App.css';
import NavBar from './components/navBar/navBar'
import Login from './components/login/Login';
import Logout from './components/logout/logout'
import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Locations from './components/locations/Locations';
// import { getData, getDataById, addData, deleteData, updateData } from './queries';


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
  <div className='navBar'>
  <NavBar/>
  </div>
  <div className='container'>
  <h2>Welcome {userProfile.givenName}!</h2>
    <Logout userProfile={userProfile} setUserProfile={setUserProfile}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
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