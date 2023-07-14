import React, { useState } from 'react';

const Weather = ({latitude,longitude,setLatitude,setLongitude}) => {
    const [weather, setWeather] = useState(null);  
    // const [latitude, setLatitude] = useState('');
    // const [longitude, setLongitude] = useState('');

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
        <div>
        {weather && (
            <div>
              <h4>Weather</h4>
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
