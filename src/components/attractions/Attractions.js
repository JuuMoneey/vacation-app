import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';

const Attractions = () => {
  const [hotels, setHotels] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [type, setType] = useState('');

  const apiKey = '7adcac2dc9msh088284d4d774577p1c3f3cjsnef3afb93ada7';

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

    await fetchData(options, setHotels, 'hotels');
  };

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
    <div>
      <h3>Hotels</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Latitude:
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </label>
          <label>
            Longitude:
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </label>
        <label htmlFor="type">Type</label>
        <select id="type" value={type} onChange={handleTypeChange}>
          <option value="">Select a type</option>
          <option value="restaurants">Restaurants</option>
          <option value="hotels">Hotels</option>
          <option value="attractions">Attractions</option>
        </select>

        <button type="submit">Fetch Data</button>
      </form>

        <h1>{type} Options</h1>
        {hotels.map((hotel) => (
          <div key={hotel.name}>
            <h4>{hotel.name}</h4>
            <p>{hotel.awards.ranking}</p>
            <p>{hotel.address}</p>
            <p>{hotel.ranking}</p>
            <p>{hotel.rating}</p>
            <p>{hotel.price_level}</p>
            <img src={hotel.photo.images.large.url} alt="Logo" />
          </div>
        ))}
      </div>
      <Weather latitude ={latitude} setLatitude={setLatitude}  longitude ={longitude} setLongitude={setLongitude} />
    </div>
  );
};

export default Attractions;
