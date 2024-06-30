import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const containerStyle = {
  width: '20%',
  height: '20%'
};

const Map = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      const google = window.google;
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        zoom: 16
      });

      new google.maps.Marker({
        map: map,
        position: { lat: parseFloat(latitude), lng: parseFloat(longitude) }
      });
    });
  }, [latitude, longitude]);

  return <div className='Map' ref={mapRef}></div>;
};

export default Map;
