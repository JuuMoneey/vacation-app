import { Link } from "react-router-dom";
import { MdOutlineTravelExplore } from "react-icons/md";
import { useState } from "react";
import "./NavBar.css";
import Logout from "../Logout/Logout";
// import Logo from './Logo.png'


export default function NavBar(props) {


  return (
    <nav className="navBar">
      <div className="page" id="nav">
<<<<<<< HEAD
=======
        Peace&Pins : "Pin Your Peaceful Moments Across the Globe."
>>>>>>> main
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
          className="navBarLi" 
          smooth={true}
          to="/Map">
            Map
          </Link>

          <Link 
          className="navBarLi" 
          smooth={true}
          to="/addPastTrip">
            Trips
          </Link>

          <Link
            className="navBarLi"
            to="/profile"
            smooth={true}
          >
            Profile
          </Link>

          <Logout userProfile={props.userProfile} setUserProfile={props.setUserProfile}/>
        </ul>
      </div>
    </nav>
  );
}