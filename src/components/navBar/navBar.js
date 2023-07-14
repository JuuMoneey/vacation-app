import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {

  return (
    <nav className="navBar">
      <div className="page" id="nav">
        Travel App
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
          <Link className="navBarLi" to="/map">
            Map
          </Link>
          <Link
            className="navBarLi"
            to="/attractions"
            smooth={true}
          >
            Attractions
          </Link>
          <Link
            className="navBarLi"
            to="/profile"
            smooth={true}
          >
            {" "}
            Profile
          </Link>
          <Link
            className="navBarLi"
            to="/logout"
            smooth={true}
          >
            Logout
          </Link>
        </ul>
      </div>
    </nav>
  );
}
