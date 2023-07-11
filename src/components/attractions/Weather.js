import React, { useState } from 'react';

const Weather = (props) => {
    const [weather, setWeather] = useState(null);  
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const WeatherAPIkey = 'c2b759dfa462e91ac01969de25a25a29';
  
    const handleSubmit = async (e) => {
      e.preventDefault();
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
        <div>
        <h4>Weather</h4>
        {weather && (
          <div>
            <p>Name: {weather.name}</p>
            <p>Temperature: {weather.main.temp}</p>
            <p>Weather main: {weather.weather.main}</p>
            <p>Weather Description: {weather.description}</p>
            <p>Max Temperature: {weather.main.temp_max}</p>
            <p>Min Temperature: {weather.main.temp_min}</p>
          </div>
        )}
      </div>
       </div>
      
    </div>
  )
}

export default Weather
