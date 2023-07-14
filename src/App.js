import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Locations from './components/Locations/Locations';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script'
import Profile from './components/Profile/Profile';
import Searchbar from './components/Searchbar/Searchbar'
import AfterLoginPage from './components/AfterLoginPage/AfterLoginPage'
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout';
import Attractions from './components/Attractions/Attractions';
// import { Link } from 'react-scroll';
import Video from './Video/Afterimage.mp4'

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

console.log(userProfile)
if(userProfile){
  return (
  <div className="Vacation-App">
  <NavBar/>
  <div className='container'>
    <Logout userProfile={userProfile} setUserProfile={setUserProfile}/>
      <Routes>
        <Route path="/" element={<Home userProfile={userProfile} />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:id" element={<Attractions />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/profile" element={<Profile userProfile={userProfile}/>}/>
      </Routes>
      

  </div>
 </div>
 );
}else{
  return (
    <div className="App">
          <Login userProfile={userProfile} setUserProfile={setUserProfile} />
    </div>
  );
  }
}

export default App;