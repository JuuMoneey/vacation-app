import './profile.css'

export default function Profile(props){

return (
    <div className="profile">
       <div className="profile-picture">
        <img src={props.user.profilePicture} alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>{props.user.username}</h2>
        <p>{props.user.email}</p>
        <p>{props.user.bio}</p>
        <p>{props.user.location}</p>
      </div>
    </div>
);
}