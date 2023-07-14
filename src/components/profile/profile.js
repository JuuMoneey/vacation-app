import './Profile.css'
import { useState } from 'react';


export default function Profile(userObj){
  const [profile, setProfile] = useState(null)


  fetch('https://localhost3030//')
  .then(res => res.json())
  .then(data => console.log(data))

return (
  <div className='profile'>
    <p>Welcome {userObj.givenName}</p>
    <div className='profileDetails'>
    <img src={userObj.userPhoto} alt="Profile Picture" className="UserProfile_Picture" />
    <p>About Me</p>
    </div>
    <div className='profileHistory'>
      <p>past trips</p>
      <p>Future trips</p>
    </div>
  </div>
  );
}



// <div className="profile">
//    <div className="profile-picture">
//     <img src={props.user.profilePicture} alt="Profile" />
//   </div>
//   <div className="profile-details">
//     <h2>{props.user.username}</h2>
//     <p>{props.user.email}</p>
//     <p>{props.user.bio}</p>
//     <p>{props.user.location}</p>
//   </div>
// </div>