// import logo from './logo.svg';
import React from 'react';
import { useEffect } from 'react';
import { gapi } from 'gapi-script'
import './App.css';
import NavBar from './components/navBar/navBar'
import Login from './components/login/Login';
import Logout from './components/logout/logout'
import LoginButton from './components/login/Login'
import LogoutButton from './components/logout/logout'


const clientId = '334215639628-vu09cfq9ob860n6hj48vosfsdl545reo.apps.googleusercontent.com';

function App() {
  // const [currentForm, setCurrentForm] = useState('login')
  useEffect(() => {
    function start() {
      gapi.client.init({ 
        clientId: clientId,
        scope: ''
      })
    };
    gapi.load('client:auth2', start)
  });

// var accessToken = gapi.auth.getToken().access_token;  

  return (
    <div className="Vacation-App">
     <NavBar/>
     <div className='container'>
     <Login/>
     <Logout/>
     <LoginButton/>
     <LogoutButton/>
     </div>
    </div>
  );
}

export default App;