import React, { useState } from "react";
import "./Login.css";
import { GoogleLogin } from "react-google-login";

const clientId =
  "334215639628-vu09cfq9ob860n6hj48vosfsdl545reo.apps.googleusercontent.com";

export default function Login(props) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);


    props.setUserProfile(res.profileObj);
  };

  //   const updateId = (e) => {
  //   setUserId(e.target.value)
  // }

  // const updateName = (e) => {
  //   setUserName(e.target.value)
  // }

  // const updateEmail = (e) => {
  //   setUserEmail(e.target.value)
  // }

  // const updateUserPhoto = (e) => {
  //   setUserPhoto(e.target.value)
  // }
console.log(props.userProfile)

  const onSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      user_id: userId,
      user_name: userName,
      user_email: userEmail,
      user_photo: userPhoto,
    };

    fetch(`http://localhost3030/login/${userObj.user_id}`, {
      method: "POST",
      headers: {
        "content-type": "application/JSON",
      },
      body: JSON.stringify(userObj),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("results", res);
      })
      .catch((error) => {
        console.log(error);
      });
    setUserId("");
    setUserName("");
    setUserEmail("");
    setUserPhoto("");
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };

  if (props.userProfile) {
    return <h2>Welcome {props.userProfile.givenName}!</h2>;
  } else {
    return (
      <div id="googleSignInBtn">
        {/* <img></img> */}
        <h1>Travel App</h1>
        <GoogleLogin
          clientId={clientId}
          buttonText="SignIn"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}

// client
// id: 334215639628-vu09cfq9ob860n6hj48vosfsdl545reo.apps.googleusercontent.com
// secret: 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
