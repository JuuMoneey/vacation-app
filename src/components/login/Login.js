import React, { useState } from "react";
import './login.css'
import { GoogleLogin } from 'react-google-login';

const clientId = '334215639628-vu09cfq9ob860n6hj48vosfsdl545reo.apps.googleusercontent.com';

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [newUser, setNewUser] = useState('')
    
    const handleSubmit = (e) =>{
      e.preventDefault();
      setEmail('');
      setPassword('');
    };

    const onSuccess = (res) => {
      console.log('LOGIN SUCCESS! Current user: ', res);
    }

    const onFailure = (res) => {
      console.log('LOGIN FAILED! res: ', res);
    }
    return (
        <div className="login">
            <h2>Sign In</h2>
            <form className="form" onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        <button className="signInBtn" type="submit">SignIn</button>
        </form>
        <div id="googleSignInBtn">
          <GoogleLogin
          clientId={clientId}
          buttonText="SignIn"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          />
        </div>
        </div>
    );
}




// client
// id: 334215639628-vu09cfq9ob860n6hj48vosfsdl545reo.apps.googleusercontent.com
// secret: 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