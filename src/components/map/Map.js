import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import "./Map.css";

function Map() {
  const [clickedGeography, setClickedGeography] = useState(null);
  const [markers, setMarkers] = useState([]);

  const handleGeographyClick = (event, geo) => {
    if (clickedGeography === geo.rsmKey) {
      setClickedGeography(null);
      setMarkers([]);
    } else {
      setClickedGeography(geo.rsmKey);
      const countryMarkers = [
        { markerOffset: -15, name: "Argentina1", coordinates: [-58.3816, -34.6037], country: "Argentina" },
        { markerOffset: -15, name: "Bolivia1", coordinates: [-68.1193, -16.4897], country: "Bolivia" },
        { markerOffset: -15, name: "Brazil1", coordinates: [-50.1193, -16.4897], country: "Brazil" },
        { markerOffset: -15, name: "US1", coordinates: [-90.0060, 40.7128], country: "United States" },
        { markerOffset: -15, name: "US2", coordinates: [-100.1193, 40.4897], country: "United States" },
        { markerOffset: -15, name: "US3", coordinates: [-112.1193, 36.4897], country: "United States" },
        { markerOffset: -15, name: "Cancun", coordinates: [-86.8515, 21.1619], country: "United States" },
      ].filter(marker => marker.country === geo.properties.name);
      setMarkers(countryMarkers);
    }
  };


  return (
    <div className="map-container">
      <ComposableMap>
        <Geographies geography="/features.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={(event) => handleGeographyClick(event, geo)}
                style={{
                  default: {
                    fill: clickedGeography === geo.rsmKey ? "#D3D3D3" : "#192748",
                  },
                  hover: {
                    fill: clickedGeography === geo.rsmKey ? "#D3D3D3" : "#FFD700",
                  },
                }}
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }, index) => (
          <Marker key={index} coordinates={coordinates}>
            <circle r={5} fill="#FF0000" />
            <text className="markerText" textAnchor="middle" y={markerOffset}>
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}

export default Map;
