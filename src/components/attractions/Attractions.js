import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './Attractions.css';

const Attractions = () => {
  const [hotels, setHotels] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [type, setType] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [weather, setWeather] = useState(null);
  let { id } = useParams(); 
  console.log("Here is the destination ID!",id)
  const apiKey = '7adcac2dc9msh088284d4d774577p1c3f3cjsnef3afb93ada7';
  const WeatherAPIkey = 'c2b759dfa462e91ac01969de25a25a29';

  const fetchData = async (options, setData, storageKey) => {
    try {
      const response = await axios.request(options);
      const data = response.data.data;
      setData(data);

      // Store the data in local storage
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: `https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`,
      params: {
        latitude: latitude,
        longitude: longitude,
        lang: 'en_US',
        limit: '5',
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WeatherAPIkey}&units=imperial`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
    await fetchData(options, setHotels, 'hotels');
  };

  useEffect(() => {
    fetch('http://localhost:3030/destinations')
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((error) => console.error('Error fetching destinations:', error));
  },[]);

  useEffect(() => {
    const cachedHotels = localStorage.getItem('hotels');
    if (cachedHotels) {
      setHotels(JSON.parse(cachedHotels));
    } else {
      const options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng',
        params: {
          latitude: latitude,
          longitude: longitude,
          lang: 'en_US',
          limit: '5',
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      };

      fetchData(options, setHotels, 'hotels');
    }
  }, []);

  return (
    <div className="attractions-container">
      <h3>Hotels</h3>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="latitude">Latitude:</label>
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="longitude">Longitude:</label>
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="type">Type:</label>
            <select id="type" value={type} onChange={handleTypeChange}>
              <option value="">Select a type</option>
              <option value="restaurants">Restaurants</option>
              <option value="hotels">Hotels</option>
              <option value="attractions">Attractions</option>
            </select>
          </div>
          <button type="submit">Fetch Data</button>
        </form>
      </div>
      <h1>{type} Options</h1>
      {hotels.map((hotel) => (
        <div key={hotel.name} className="hotel-card">
          <h4>{hotel.name}</h4>
          <p>{hotel.ranking}</p>
          <img src={hotel.photo?.images.large.url} alt="PLACE_PICTURE" />
          <p>{hotel.awards?.ranking}</p>
          <p>{hotel.address}</p>
          <p>{hotel.rating}</p>
          <p>{hotel?.phone}</p>
          <button onClick={() => window.open(hotel.web_url, '_blank')}>
            Trip Advisor
          </button>
          <button onClick={() => window.open(hotel.website, '_blank')}>
            Website
          </button>
          <p>{hotel.price_level}</p>
          <button onClick={() => window.open(hotel.website, '_blank')}>
            Add to your trip
          </button>
        </div>
      ))}
      <div className="weather-container">
        <h4>Weather</h4>
        {weather && (
          <div>
            <p>Name: {weather.name}</p>
            <p>Temperature: {weather.main.temp}</p>
            <p>Weather main: {weather.weather[0].main}</p>
            <p>Weather Description: {weather.weather[0].description}</p>
            <p>Max Temperature: {weather.main.temp_max}</p>
            <p>Min Temperature: {weather.main.temp_min}</p>
          </div>
        )}
      </div>
      <div>
        <h3>View more locations</h3>
        <div className="destinations">
          {destinations.map((destination, index) => (
            <div key={index} className="destination">
              <p>ID: {destination.id}</p>
              <img src={destination.photo} alt="destination" />
              <div className="destination-details">
                <h3>{destination.name}</h3>
                <p>Country: {destination.country}</p>
                <p>Longitude: {destination.longitude}</p>
                <p>Latitude: {destination.latitude}</p>
                <button
                  onClick={() => {
                    setLongitude(destination.longitude);
                    setLatitude(destination.latitude);
                  }}
                >
                  View attractions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attractions;
