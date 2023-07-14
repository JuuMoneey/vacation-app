import "./Profile.css";

export default function Profile({ userProfile }) {
console.log(userProfile)
    return (
      <div className="profile">
        <h2>Welcome {userProfile.givenName}</h2>
         <img src={userProfile.imageUrl} alt="Profile Picture" className="UserProfile_Picture" />
         <p></p>
          <div>
            <p>{userProfile.name}</p>
            <p>{userProfile.email}</p>
          </div>
        
      </div>
    );
  };

