import React from 'react';
import { Link } from 'react-router-dom';
import './locations.css';

function Locations(){
    const locations = [
        { name: 'Location 1', image: 'locale1.jpg' },
        { name: 'Location 2', image: 'locale2.jpg' },
        { name: 'Location 3', image: 'locale3.jpg' },
        { name: 'Location 4', image: 'locale4.jpg' },
    ];

    return (
        <div>
            <div className="top-bar">
                <Link to="/" className="back-button">Back</Link>
                <button className="sign-in-button">Sign In</button>
                <button className="settings-button">Settings</button>
            </div>
            <div className="locations-container">
                {locations.map((location, index) => (
                    <div className="location-box" key={index}>
                        <img className="location-image" src={`/images/${location.image}`} alt={location.name} />
                        <h2 className="location-name">{location.name}</h2>
                        <button className="location-button">Listing</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Locations;
