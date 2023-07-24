import "./Profile.css";
import Logout from "../Logout/Logout";

export default function Profile(props) {

  return (
    <div className="profileBox">
    <div className="profile">
      <h2>Welcome {props.userProfile.givenName}</h2>
      <img
        src={props.userProfile.imageUrl}
        alt="Profile Picture"
        className="userProfile_Picture"
        />
        <p>{props.userProfile.name}</p>
        <p>{props.userProfile.email}</p>
        <Logout userProfile={props.userProfile} setUserProfile={props.setUserProfile}/>
    </div>
    </div>
  );
}
