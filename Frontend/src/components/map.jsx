import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Initialize map
          const leafletMap = L.map("map").setView([latitude, longitude], 13);
          setMap(leafletMap);

          // Add OpenStreetMap tiles
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
          }).addTo(leafletMap);

          // Add a marker to the user's location
          const marker = L.marker([latitude, longitude]).addTo(leafletMap);
          marker.bindPopup("You are here").openPopup();
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
      {location.latitude && location.longitude && (
        <div style={{ marginTop: "10px" }}>
          <strong>Your Location:</strong> <br />
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </div>
      )}
    </div>
  );
}
