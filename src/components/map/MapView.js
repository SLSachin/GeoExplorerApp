import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LocationPreview from './LocationPreview';
import ApiService from '../../services/ApiService';
import "leaflet/dist/leaflet.css";

const MapView = ({selectedStateId}) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  useEffect(() => {
    // Fetch locations based on the selected state id
    const fetchLocations = async () => {
      try {
        const response = await ApiService.getLocationsByStateId(selectedStateId);
        console.log(response);
        setLocations(response);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, [selectedStateId]);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const handleClosePreview = () => {
    setSelectedLocation(null);
  };

  return (
    <div>
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            eventHandlers={{ click: () => handleMarkerClick(location) }}
          >
            <Popup>
              <h3>{location.title}</h3>
              <p>{location.address}</p>
              </Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedLocation && (
        <LocationPreview
          location={selectedLocation}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};

export default MapView;



// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import "leaflet/dist/leaflet.css";



// const MapView = () => {
//   const [selectedState, setSelectedState] = useState('New York');
//   const [locations, setLocations] = useState([]);
//   const [newMarkerPositions, setNewMarkerPositions] = useState([]);

//   useEffect(() => {
//       const L = require("leaflet");

//       delete L.Icon.Default.prototype._getIconUrl;

//       L.Icon.Default.mergeOptions({
//         iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//         iconUrl: require("leaflet/dist/images/marker-icon.png"),
//         shadowUrl: require("leaflet/dist/images/marker-shadow.png")
//       });
//     }, []);


//   useEffect(() => {
//     // Dummy data for demonstration
//     const dummyLocations = [
//       { id: 1, title: 'Location 1', address: '123 Main St, New York', lat: 40.7128, lng: -74.006 },
//       { id: 2, title: 'Location 2', address: '456 Oak St, New York', lat: 41.8781, lng: -87.6298 },
//       // Add more dummy locations as needed
//     ];

//     // Filter dummy data based on the selected state
//     const filteredLocations = dummyLocations.filter((location) => location.address.includes(selectedState));

//     setLocations(filteredLocations);
//   }, [selectedState]);

//   const handleStateChange = (e) => {
//     setSelectedState(e.target.value);
//   };

//   const handleMapClick = (event) => {
//     // Add a new marker position to the list
//     setNewMarkerPositions((prevPositions) => [...prevPositions, [event.latlng.lat, event.latlng.lng]]);
//   };

//   const MapClickEvents = () => {
//     const map = useMapEvents({
//       click: handleMapClick,
//     });

//     return null; // This hook doesn't render anything
//   };

//   return (
//     <div>
//       <select onChange={handleStateChange} value={selectedState}>
//         <option value="New York">New York</option>
//         <option value="California">California</option>
//         {/* Add options for all 50 states */}
//       </select>
//       <MapContainer center={[40.7128, -74.006]} zoom={13} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {locations.map((location) => (
//           <Marker key={location.id} position={[location.lat, location.lng]} >
//             <Popup>
//               {/* Render location details in the Popup */}
//               <div>{location.title}</div>
//               <div>{location.address}</div>
//               {/* Add Edit and Delete buttons based on user role */}
//             </Popup>
//           </Marker>
//         ))}
//         {newMarkerPositions && newMarkerPositions.map((position, index) => (
//           <Marker key={index} position={position}>
//             <Popup>
//               <input placeholder="Title" />
//               <div>New Marker</div>
//             </Popup>
//           </Marker>
//         ))}
//         <MapClickEvents />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapView;
