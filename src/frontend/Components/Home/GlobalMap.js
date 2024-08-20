import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import "../styles/map.css"; // Ensure the path is correct

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const GlobalMap = () => {
  const [jobsByCountry, setJobsByCountry] = useState({
    USA: 100, // Static data for demonstration
    Canada: 50, // Static data for demonstration
    Egypt: 30, // Static data for demonstration
    Germany: 75, // Static data for demonstration
  });
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <h1>Where We Go For Jobs</h1>
        <p>These are Real-Time available Job Insights for the current week!</p>
      </div>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
        width={980}
        height={551}
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.NAME;
                const jobCount = jobsByCountry[countryName] || 0;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(countryName)}
                    style={{
                      default: {
                        fill: "#B3D1FF", // Light blue fill color for all countries
                        outline: "none",
                      },
                      hover: {
                        fill: "#6495ED", // Darker blue on hover
                        outline: "none",
                      },
                      pressed: {
                        fill: "#6495ED", // Even darker blue when pressed
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {selectedCountry && (
        <div className="country-info">
          <h2>{selectedCountry}</h2>
          <p>Available jobs: {jobsByCountry[selectedCountry] || 0}</p>
        </div>
      )}
    </div>
  );
};

export default GlobalMap;
