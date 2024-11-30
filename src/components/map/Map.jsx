/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';

const Map = () => {
  const salesData = useSelector((state) => state.chart.salesData);
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([20, 0], 2); // Centered on the world

    // Add OpenStreetMap tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create layer groups for each region
    const northAmericaLayer = L.layerGroup();
    const europeLayer = L.layerGroup();
    const asiaLayer = L.layerGroup();
    const southAmericaLayer = L.layerGroup();

    // Add markers to the respective layer groups
    salesData.forEach(data => {
      const marker = L.marker([data.latitude, data.longitude])
        .bindPopup(`<strong>${data.city}, ${data.country}</strong><br>Product: ${data.product}<br>Sales: ${data.sales}`);

      switch (data.region) {
        case "North America":
          northAmericaLayer.addLayer(marker);
          break;
        case "Europe":
          europeLayer.addLayer(marker);
          break;
        case "Asia":
          asiaLayer.addLayer(marker);
          break;
        case "South America":
          southAmericaLayer.addLayer(marker);
          break;
        default:
          break;
      }
    });

    // Add layer control
    const overlayMaps = {
      "North America": northAmericaLayer,
      "Europe": europeLayer,
      "Asia": asiaLayer,
      "South America": southAmericaLayer
    };

    L.control.layers(null, overlayMaps).addTo(map);

    // Add layer groups to the map
    northAmericaLayer.addTo(map);
    europeLayer.addTo(map);
    asiaLayer.addTo(map);
    southAmericaLayer.addTo(map);

    // Cleanup on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" className='h-96 w-full' ></div>;
};

export default Map;