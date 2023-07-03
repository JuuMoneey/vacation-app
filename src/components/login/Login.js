import React from "react";
import "./login.css";
import { GoogleLogin } from "react-google-login";

const clientId =
  "334215639628-vu09cfq9ob860n6hj48vosfsdl545reo.apps.googleusercontent.com";

export default function Login(props) {
  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    
    props.setUser({
      user_id: res.profileObj.googleId,
      display_name: res.profileObj.name,
      email: res.profileObj.email,
      user_photo: res.profileObj.imageUrl,
    });
    console.log(props.user)
    props.setUserProfile(res.profileObj);
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };

  if (props.userProfile) {
    return <h2>Welcome {props.userProfile.givenName}!</h2>;
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