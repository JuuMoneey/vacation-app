// import { AiOutlineMenu, AiOutlineMenuUnfold } from "react-icons/ai";
import React, { useState } from 'react';
import { Link } from 'react-scroll';
import './NavBar.css'

export default function NavBar(){
    const [hover, setHover] = useState(false);
    const [click, setClick] = useState(false)
  
      return (
  <nav className="navBar">
  <div className="page" id="nav">Travel App</div>
    <div>
      <ul>
        <Link className="navBarLi" onClick={() => setClick(!click)} to='/' smooth={true}>Home</Link>
        <Link className=''>Map</Link>
        <Link className="navBarLi" onClick={() => setClick(!click)} to='Attractions' smooth={true}>Attractions</Link>
        <Link className="navBarLi" onClick={() => setClick(!click)} to='/Profile' smooth={true}> Profile</Link>
        <Link className="navBarLi" onClick={() => setClick(!click)} to='/Logout' smooth={true}>Logout</Link>
      </ul>
    </div>
      <div className='navHamburger' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setClick(!click)}>
    {/* {!hover && !click ? <AiOutlineMenuUnfold/> : <AiOutlineMenu/>} */}
     </div>
  </nav>
      );
  }

