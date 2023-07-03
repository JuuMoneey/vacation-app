import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from './Logo.png';


const options = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng',
  params: {
    latitude: '12.91285',
    longitude: '100.87808',
    lang: 'en_US',
    hotel_class: '1,2,3',
    limit: '5',
    rooms: '1',
    currency: 'USD',
    zff: '4,6',
    subcategory: 'hotel,bb,specialty',
  },
  headers: {
    'X-RapidAPI-Key': '4eaeab7c40mshabdcafd6c733cc2p18cf5djsn38da563796a1',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
  },
};


const options1 = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
  params: {
    latitude: '12.91285',
    longitude: '100.87808',
    limit: '5',
    currency: 'USD',
    distance: '2',
    open_now: 'false',
    lunit: 'km',
    lang: 'en_US'
  },
  headers: {
    'X-RapidAPI-Key': '4eaeab7c40mshabdcafd6c733cc2p18cf5djsn38da563796a1',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}



const options2 = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng',
  params: {
    longitude: '109.19553',
    latitude: '12.235588',
    lunit: '5',
    lang: 'en_US'
  },
  headers: {
    'X-RapidAPI-Key': '4eaeab7c40mshabdcafd6c733cc2p18cf5djsn38da563796a1',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options2);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

function App() {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const getHotelsData = async () => {
      try {
        const response = await axios.request(options);
        const data = response.data.data;
        setHotels(data);
      } catch (error) {
        console.error(error);
      }
    };

    getHotelsData();
  }, []);

  useEffect(() => {
    const getRestaurantsData = async () => {
      try {
        const response = await axios.request(options1);
        const data = response.data.data;
        setRestaurants(data);
      } catch (error) {
        console.error(error);
      }
    };

    getRestaurantsData();
  }, []);

  useEffect(() => {
    const getAttractionsData = async () => {
      try {
        const response = await axios.request(options2);
        const data = response.data.data;
        setAttractions(data);
      } catch (error) {
        console.error(error);
      }
    };

    getAttractionsData();
  }, []);

  return (
    <div>
      <div className="top-bar">
        <button className="back-button">Back</button>
        <button className="sign-in-button">Sign In</button>
        <button className="settings-button">Settings</button>
      </div>
      <div className="logo-container">
        <img className="logo" src={Logo} alt="Logo" />
      </div>

      <h3>Hotels</h3>

      <div>
        <h1>Hotel Options</h1>
        {hotels.map((hotel) => (
          <div key={hotel.place_id}>
            <h2>{hotel.name}</h2>
            <h2>{hotel.timezone}</h2>
            <p>{hotel.awards.ranking}</p>
            <img src={hotel.photo.images.large.url} alt="Logo" />;
          </div>
        ))}
      </div>

      <h3>Restaurants</h3>

      <div>
        <h1>Restaurants Options</h1>
        {restaurants.map((restaurant) => (
          <div key={restaurant.place_id}>
            <h2>{restaurant.name}</h2>
            {/* <h2>{resturant.timezone}</h2> */}
            <p>{restaurant.rating}</p>
            <p>{restaurant.ranking}</p>
            {/* <img src={restaurant.photo.images.large.url} alt="Logo" />; */}
          </div>
        ))}
      </div>
      <h3>Attractions</h3>
      
      <div>
        <h1>Attractions Options</h1>
        {attractions.map((attraction) => (
          <div key={attraction.place_id}>
            <h2>{attraction.name}</h2>
            {/* <h2>{resturant.timezone}</h2> */}
            <p>{attraction.rating}</p>
            <p>{attraction.ranking}</p>
            {/* <img src={attraction.photo.images.large.url} alt="Logo" />; */}
          </div>
        ))}
      </div>


      <h3>Location</h3>
      <h3>Info</h3>
      <p>Weather</p>
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

export default App;
