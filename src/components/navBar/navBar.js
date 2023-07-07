import { AiOutlineMenu, AiOutlineMenuUnfold } from "react-icons/ai";
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
        <Link className="navBarLi" onClick={() => setClick(!click)} to='Home' smooth={true}>Home</Link>
        <Link className="navBarLi" onClick={() => setClick(!click)} to='Attractions' smooth={true}>Attractions</Link>
        <Link className="navBarLi" onClick={() => setClick(!click)} to='Locations' smooth={true}>Locations</Link>
        <Link className="navBarLi" onClick={() => setClick(!click)} to='logout' smooth={true}>Logout</Link>
        {/* <Link className="navBarLi" onClick={() => setClick(!click)} to='' smooth={true}></Link> */}
      </ul>
    </div>
      <div className='navHamburger' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setClick(!click)}>
    {!hover && !click ? <AiOutlineMenuUnfold/> : <AiOutlineMenu/>}
     </div>
  </nav>
      );
  }
