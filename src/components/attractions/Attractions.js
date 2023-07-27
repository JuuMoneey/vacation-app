import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Modal from 'react-modal';
import './Attractions.css';
import Video from "../../Video/Afterimage.mp4";

const Attractions = () => {
  const [places, setPlaces] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [type, setType] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [weather, setWeather] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  let { id } = useParams(); 
  const apiKey = '7adcac2dc9msh088284d4d774577p1c3f3cjsnef3afb93ada7';
  const WeatherAPIkey = 'c2b759dfa462e91ac01969de25a25a29';
  const [tripInfo, setTripInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropValue, setDropValue] = useState('');
  const [activeAttraction, setActiveAttraction] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3030/getTripsByUserId/googleid2');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTripInfo(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching getTrips data:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = (place) => {
    setIsModalOpen(true);
    setActiveAttraction(place)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDropValue(e.target.value);
    console.log(e.target.value)
  }

  const submitAttraction = (e) => {
    const newAttraction = {
      name: activeAttraction.name,
      destination_id: destinations[0].id,
      trip_id: dropValue
    }
    e.preventDefault();
    fetch(`http://localhost:3030/trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAttraction),
    })
      .then(res => res.json())
      .then(() => {
        setActiveAttraction({ name: '', destination_id: '', trip_id: '' });
      })
    console.log(activeAttraction.name, dropValue, destinations[0].id)
    closeModal();
  }

  
  const fetchData = async (options, setData, storageKey) => {
    try {
      const response = await axios.request(options);
      const data = response.data.data;
      setData(data);

      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleTypeChange = async (event) => {
    setType(event.target.value);
    event.preventDefault();

    const options = {
      method: 'GET',
      url: `https://travel-advisor.p.rapidapi.com/${event.target.value}/list-by-latlng`,
      params: {
        latitude: latitude,
        longitude: longitude,
        lang: 'en_US',
        limit: '5',
        min_rating: '3.3'
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
    await fetchData(options, setPlaces, 'places');
  };

  useEffect(() => {
    fetch(`http://localhost:3030/destinations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        const { latitude, longitude } = data[0];
        setLatitude(latitude);
        setLongitude(longitude);
      })
      .catch((error) => console.error('Error fetching destinations:', error));
  }, [id]);


  useEffect(() => {
    const cachedPlaces = localStorage.getItem('places');
    if (cachedPlaces) {
      setPlaces(JSON.parse(cachedPlaces));
    } else {
      const options = {
        method: 'GET',
        url: `https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng`,
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

      fetchData(options, setPlaces, 'Places');
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
  <div className='attractions'>
    <div className="traction-video">
          <video
            className="traction-video"
            src={Video}
            muted
            autoPlay
            loop
            type="video/mp4"
          ></video>
        </div>

    <div className="attractions-container">
      <h3>Browse through hotels,resturants and attractions</h3>
      <div className='dest'>

<div className="destinations">
  {destinations.map((destination, index) => (
    <div key={index} className="destinationCard">
      <p>View attractions of {destination.name}</p>
      <p>ID: {destination.id}</p>
      <img src={destination.photo} alt="destination" />
      <div className="destination-details">
        <h3>{destination.name}</h3>
        <p>Country: {destination.country}</p>
        <p>Longitude: {destination.longitude}</p>
        <p>Latitude: {destination.latitude}</p>
      </div>

      </div>
  ))}
  </div>
      <div className="weather-container">
        <h4>Weather</h4>
        {weather && (
          <div className='weatherBox'>
            <p>Name: {weather.name}</p>
            <p>Temperature: {weather.main.temp}</p>
            <p>Weather main: {weather.weather[0].main}</p>
            <p>Weather Description: {weather.weather[0].description}</p>
            <p>Max Temperature: {weather.main.temp_max}</p>
            <p>Min Temperature: {weather.main.temp_min}</p>
          </div>
        )}
      </div>
      </div>


      
      <div className="form-container">
                 <div className="form-row">
            <label htmlFor="type">Select Hotel,Restaurants or attractions:</label>
            <select id="type" value={type} onChange={handleTypeChange} >
              <option value="">Select a type</option>
              <option value="restaurants">Restaurants</option>
              <option value="hotels">Hotels</option>
              <option value="attractions">Attractions</option>
            </select>
          </div>
      </div>
      <h1>{type} Options</h1>

      <div className='cards'>
      <div className='options'>
      {places.map((place) => (
        <div key={place.name} className="place-card">
          <h4>{place.name}</h4>
          <p>{place.ranking}</p>
          <img src={place.photo?.images.large.url} alt="PLACE_PICTURE" />
          <p>{place.awards?.ranking}</p>
          <p>{place.address}</p>
          <p>{place.rating}</p>
          <p>{place?.phone}</p>
          <button 
          style={{ cursor: isHovered ? 'pointer' : 'auto' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => window.open(place.web_url, '_blank')}>
            Trip Advisor
          </button>
          <button 
          style={{ cursor: isHovered ? 'pointer' : 'auto' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => window.open(place.website, '_blank')}>
            Website
          </button>
          <p>{place.price_level}</p>
          <button 
          style={{ cursor: isHovered ? 'pointer' : 'auto' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => openModal(place)}>
            Add to your trip
          </button>
        </div>
      ))}
      </div>
      <Modal className="modal" ariaHideApp={false} isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Trips</h2>
        <select onChange={e => handleChange(e)} value={dropValue}>
          <option defaultValue>Select a trip</option>
          {tripInfo.map((trip) => (
            <option key={trip.id} value={trip.id}>{trip.name}</option>
            ))}
        </select>
        <button onClick={submitAttraction}>Submit</button>
      </Modal>
    </div>
    </div>

    </div>
  );
};
   
export default Attractions;