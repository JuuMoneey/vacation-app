import React, { useState } from "react";
import "./Login.css";
import { GoogleLogin } from "react-google-login";


const clientId =
  "334215639628-vu09cfq9ob860n6hj48vosfsdl545reo.apps.googleusercontent.com";

export default function Login(props) {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhoto, setUserPhoto] = useState('');


  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);

    props.setUser({
        id: res.profileObj.googleId,
        name: res.profileObj.name,
        email: res.profileObj.email,
        user_photo: res.profileObj.imageUrl,
    });
    console.log(props.user)
    props.setUserProfile(res.profileObj);
  };

  const updateId = (e) => {
  setUserId(e.target.value)
}

const updateName = (e) => {
  setUserName(e.target.value)
}

const updateEmail = (e) => {
  setUserEmail(e.target.value)
}

const updateUserPhoto = (e) => {
  setUserPhoto(e.target.value)
}

const onSubmit = (e) => {
  e.preventDefault()
  const userObj = {
    user_id: userId,
    user_name: userName,
    user_email: userEmail,
  }

  fetch('http://localhost3030', {
  method: 'POST',
  headers: {
    'content-type' : 'application/JSON' 
  },
  body: JSON.stringify(userObj)
})
.then(res => res.json())
.then(res => {
  console.log(res)
})
.catch(error => {
  console.log(error)
});
setUserId('')
setUserName('')
setUserEmail('')
setUserPhoto('')
};

const onFailure = (res) => {
  console.log("LOGIN FAILED! res: ", res);
};

if (props.userProfile) {
  return (
    <div>
      <h2>Welcome {props.userProfile.givenName}!</h2>
      {props.userProfile.imageUrl && (
        <img src={props.userProfile.imageUrl} alt="Profile Picture" />
      )}
    </div>
  );
} else {
  return (
    <div id="googleSignInBtn">
      <GoogleLogin
        clientId={clientId}
        buttonText="SignIn"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}
}



// client
// id: 334215639628-vu09cfq9ob860n6hj48vosfsdl545reo.apps.googleusercontent.com
// secret: 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
