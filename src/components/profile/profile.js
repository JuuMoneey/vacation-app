import "./Profile.css";
import Logout from "../Logout/Logout";

export default function Profile({ userProfile }) {
  // const [userProfile, setUserProfile] = useState(null)
  console.log(userProfile);
  return (
    <div className="profile">
      <h2>Welcome {userProfile.givenName}</h2>
      <img
        src={userProfile.imageUrl}
        alt="Profile Picture"
        className="userProfile_Picture"
        />
        <p>{userProfile.name}</p>
        <p>{userProfile.email}</p>
        <Logout/>
    </div>
  );
}