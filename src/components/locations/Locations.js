import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Locations.css';

function Locations() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTermFromURL = searchParams.get('search') || '';

  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL);
  const [selectedCountry, setSelectedCountry] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3030/destinations')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error(error));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleCountryFilter = event => {
    setSelectedCountry(event.target.value);
  };

  const filteredLocations = locations.filter(location => {
    const searchMatch =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.country.toLowerCase().includes(searchTerm.toLowerCase());

    const countryMatch =
      selectedCountry === '' || location.country.toLowerCase() === selectedCountry.toLowerCase();

    return searchMatch && countryMatch;
  });

  const countries = [...new Set(locations.map(location => location.country))];

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedCountry} onChange={handleCountryFilter}>
          <option value="">All Countries</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div className="locations-container">
        {filteredLocations.map((location, index) => (
          <Link key={index} to={`/locations/${location.id}`} className="location-link">
            <div className="location-box">
              <img className="location-image" src={location.photo} alt={location.name} />
              <h2 className="location-name">{location.name}</h2>
              <p className="location-country">{location.country}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Locations;
