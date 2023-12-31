import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import "./Map.css";

function Map() {
  const navigate = useNavigate();
  const [hoveredGeography, setHoveredGeography] = useState(null);
  const [markers, setMarkers] = useState([]);
  const apiEndpoint = 'd1768jeapet3h0.cloudfront.net'
  const handleGeographyHover = (event, geo) => {
    if (geo.rsmKey === hoveredGeography) return;

    setHoveredGeography(geo.rsmKey);

    if (hoveredGeography !== null) {
      setMarkers([]);
    } else {
      fetch(`http://${apiEndpoint}/destinations`)
        .then(response => response.json())
        .then(data => {
          const countryMarkers = data
            .filter(marker => marker.country === geo.properties.name)
            .map(marker => ({
              name: marker.name,
              country: marker.country,
              coordinates: [marker.longitude, marker.latitude],
            }));
          setMarkers(countryMarkers);
        })
        .catch(error => {
          console.error("Error fetching marker data:", error);
        });
    }
  };

  const handleGeographyLeave = () => {
    setHoveredGeography(null);
    setMarkers([]);
  };

  // useEffect(() => {
    // fetch(`http://${apiEndpoint}/destinations`)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log("Fetched data:", data);
  //       setMarkers(data.map(marker => ({
  //         name: marker.name,
  //         country: marker.country,
  //         coordinates: [marker.longitude, marker.latitude],
  //       })));
  //     })
  //     .catch(error => {
  //       console.error("Error fetching marker data:", error);
  //     });
  // }, []);

  const handleCountryClick = (country) => {
    navigate(`/locations?search=${country}`);
  };

  return (
    
    <div className="map-container">
      <ComposableMap>
      <ZoomableGroup center={[0, 0]} zoom={1}>
        <Geographies geography="/features.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={(event) => handleGeographyHover(event, geo)}
                onMouseLeave={handleGeographyLeave}
                onClick={() => handleCountryClick(geo.properties.name)}
                style={{
                  default: {
                    fill: hoveredGeography === geo.rsmKey ? "#FFD700" : "#192748",
                    cursor: "pointer",
                  },
                  hover: {
                    fill: "#FFD700",
                  },
                }}
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates }, index) => (
          <Marker key={index} coordinates={coordinates}>
            <circle r={2} fill="#FF0000"  style={{ pointerEvents: "none" }}/>
          </Marker>
        ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}

export default Map;
