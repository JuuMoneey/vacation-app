import React, { useState } from 'react';
import axios from 'axios';

function Attractions() {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState(null);

  const WeatherAPIkey = 'c2b759dfa462e91ac01969de25a25a29';
  const apiKey = '7adcac2dc9msh088284d4d774577p1c3f3cjsnef3afb93ada7';

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    // const options1 = {
    //   method: 'GET',
    //   url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
    //   params: {
    //     latitude: latitude,
    //     longitude: longitude,
    //     limit: '5',
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': apiKey,
    //     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    //   },
    // };

    // const options2 = {
    //   method: 'GET',
    //   url: 'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng',
    //   params: {
    //     longitude: longitude,
    //     latitude: latitude,
    //     lunit: '5',
    //     lang: 'en_US',
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': apiKey,
    //     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    //   },
    // };

    const fetchData = async (options, setData) => {
      try {
        const response = await axios.request(options);
        const data = response.data.data;
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    await fetchData(options, setHotels);
    // await fetchData(options1, setRestaurants);
    // await fetchData(options2, setAttractions);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WeatherAPIkey}&units=imperial`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Hotels</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Latitude:
            <input
              type="text"
              defaultValuevalue={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </label>
          <label>
            Longitude:
            <input
              type="text"
              defaultValuevalue={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>

        <h1>Hotel Options</h1>
        {hotels.map((hotel) => (
          <div key={hotel.name}>
            <h2>{hotel.name}</h2>
            <h2>{hotel.timezone}</h2>
            <p>{hotel.awards.ranking}</p>
            <p>{hotel.address}</p>
            <p>{hotel.award.display_name}</p>

            <img src={hotel.photo.images.large.url} alt="Logo" />
          </div>
        ))}
      </div>

      <h3>Restaurants</h3>

      {/* <div>
        <h1>Restaurants Options</h1>
        {restaurants.map((restaurant) => (
          <div key={restaurant.name}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.rating}</p>
            <p>{restaurant.ranking}</p>
            <img src={restaurant.photo.images.large.url} alt="Logo" />
          </div>
        ))}
      </div> */}

      <h3>Attractions</h3>

      {/* <div>
        <h1>Attractions Options</h1>
        {attractions.map((attraction) => (
          <div key={attraction.name}>
            <h2>{attraction.name}</h2>
            <p>{attraction.rating}</p>
            <p>{attraction.ranking}</p>
            <img src={attraction.photo.images.large.url} alt="Logo" />
          </div>
        ))}
      </div> */}

      <h3>Location Info</h3>

      <h4>Weather</h4>
      <div>
        <h4>Weather</h4>
        {weather && (
          <div>
            <p>Name: {weather.name}</p>
            <p>Temperature: {weather.main.temp}</p>
            <p>Weather: {weather.coord.weather.main}</p>
            <p>Max Temperature: {weather.main.temp_max}</p>
            <p>Min Temperature: {weather.main.temp_min}</p>
          </div>
        )}
      </div>

      <p>Average Cost: $$$$</p>
      <p>Languages spoken:</p>
      <p>Currency:</p>

      <div className="Comments">
        <h3>Comments</h3>
        <button>Add a comment</button>
      </div>
    </div>
  );
}

export default Attractions;
