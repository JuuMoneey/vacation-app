import "./Profile.css";
import Logout from "../Logout/Logout";
import Video4 from "../../Video-4/Video-4.mp4";

export default function Profile(props) {

  return (
    <div className="profilePg">

    <div className="profile-video" >
      <video 
      className="profile-video"
      src={Video4}
      muted 
      autoPlay 
      loop 
      type="video/mp4">
      </video>
    </div>

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
   </div>
  );
}