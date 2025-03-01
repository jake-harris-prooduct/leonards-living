import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getLocation } from '../utils/data';

export default function Map({ friendsData, year }) {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 2); // Default center and zoom
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add markers for each friend
    const markers = {};
    for (const friend in friendsData) {
      const location = getLocation(friendsData[friend], year);
      if (location) {
        const marker = L.marker([location.latitude, location.longitude]).addTo(map);
        marker.bindPopup(`${friend} (${location.city}, ${location.year})`);
        markers[friend] = marker;
      }
    }

    // Cleanup function to remove the map on unmount
    return () => {
      map.remove();
    };
  }, [friendsData, year]);

  return <div id="map" style={{ height: '600px', width: '100%' }}></div>;
}
