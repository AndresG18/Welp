// import React, { useEffect, useRef } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';

// const containerStyle = {
//   width: '20%',
//   height: '20%'
// };

// const Map = ({ latitude, longitude }) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const apiKey = import.meta.env.GOOGLE_API_KEY;
//     console.log(apiKey)
//     const loader = new Loader({
//       apiKey: apiKey,
//       version: 'weekly',
//       libraries: ['places']
//     });

//     loader.load().then(() => {
//       const google = window.google;
//       const map = new google.maps.Map(mapRef.current, {
//         center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
//         zoom: 16
//       });

//       new google.maps.marker.AdvancedMarkerElement({
//         map: map,
//         position: { lat: parseFloat(latitude), lng: parseFloat(longitude) }
//       });
//     });
//   }, [latitude, longitude]);

//   return <div className='Map' ref={mapRef}></div>;
// };

// export default Map;
