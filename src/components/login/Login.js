import React, { useState } from "react";
import "./Login.css";
import { GoogleLogin } from "react-google-login";
import Video2 from "../../Video-2/Video-2.mp4";

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

  const updateId = (e) => {
    setUserId(e.target.value);
  };

  // const updateName = (e) => {
  //   setUserName(e.target.value)
  // }

  // const updateEmail = (e) => {
  //   setUserEmail(e.target.value)
  // }

  // const updateUserPhoto = (e) => {
  //   setUserPhoto(e.target.value)
  // }

  console.log(props.userProfile);

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
      <div>
        <div className="video">
          <video
            className="signInVideo"
            src={Video2}
            muted
            autoPlay
            loop
            type="video/mp4"
          ></video>
        </div>
        <div className="tranBox">
        <div id="signInBox">
          <h1>Welcome To Peace&Pins</h1>
        <div className="googleBtn" id="login">
        <GoogleLogin
          clientId={clientId}
          buttonText="SignIn"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          />
          </div>
          <footer>"Pin Your Peaceful Moments Across the Globe."</footer>
          </div>
          </div>
      </div>
    );
  }
}
