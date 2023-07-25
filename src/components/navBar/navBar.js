import { Link } from "react-router-dom";
import { MdOutlineTravelExplore } from "react-icons/md";
import { useState } from "react";
import "./NavBar.css";
import Logout from "../Logout/Logout";
// import Logo from './Logo.png'


export default function NavBar() {
  const [userProfile, setUserProfile] = useState(null)


  return (
    <nav className="navBar">
      <div className="page" id="nav">
      <MdOutlineTravelExplore className="icon" />
        Travel App
        {/* <img className="logo" src={Logo} alt="Logo" /> */}
      </div>
      <div>
        <ul>
          <Link
            className="navBarLi"
            to="/"
            smooth={true}
          >
            Home
          </Link>

          <Link 
          className="navBarLi" to="/Map">
            Map
          </Link>
          <Link
            className="navBarLi"
            to="/profile"
            smooth={true}
          >
            {" "}
            Profile
          </Link>

          <Logout userProfile={userProfile} setUserProfile={setUserProfile}/>
        </ul>
      </div>
    </nav>
  );
}