import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";

import ApiService from "../../services/ApiService";
import "leaflet/dist/leaflet.css";
import PopupInput from "./PopupInput";
import MarkerController from "./MarkerController";

const MapView = ({ selectedStateId }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [isEditingMarker, setIsEditingMarker] = useState(false);
  const [isDeletingMarker, setIsDeletingMarker] = useState(false);
  const [newMarkerData, setNewMarkerData] = useState();
  const markerRef = useRef(null);
  const headerHeight = 64;

  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  useEffect(() => {
    // Fetch locations based on the selected state id
    const fetchLocations = async () => {
      try {
        const response = await ApiService.getLocationsByStateId(
          selectedStateId
        );
        setLocations(response);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [selectedStateId]);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    if (isEditingMarker) {
      console.log("Editing marker");
      setNewMarkerData({
        latitude: location.latitude,
        longitude: location.longitude,
        title: location.title,
        address: location.address,
      });
    }
    if (isDeletingMarker){
      console.log("Deleting marker");
      ApiService.deleteLocation(location.id);
      setLocations(locations.filter((loc) => loc.id !== location.id));
      setIsDeletingMarker(false);
    }
  };

  const handleSaveNewMarker = async () => {
    try {
      setIsAddingMarker(false);
      const newLocation = await ApiService.addLocation({
        title: newMarkerData.title,
        latitude: newMarkerData.latitude,
        longitude: newMarkerData.longitude,
        address: newMarkerData.address,
        stateId: selectedStateId,
      });

      setLocations((prevLocations) => [...prevLocations, newLocation]);
      setSelectedLocation(null);
      console.log("New marker added successfully:", newLocation);
    } catch (error) {
      console.error("Error adding new marker:", error);
    }
  };

  const handleSaveEditMarker = async () => {
    try {
      setIsEditingMarker(false);
      const updatedLocation = await ApiService.editLocation(
        selectedLocation.id,
        {
          title: newMarkerData.title,
          latitude: newMarkerData.latitude,
          longitude: newMarkerData.longitude,
          address: newMarkerData.address,
          stateId: selectedStateId,
        }
      );
      setLocations((prevLocations) => [...prevLocations, updatedLocation]);
      setSelectedLocation(null);
      console.log("New marker added successfully:", updatedLocation);
    } catch (error) {
      console.error("Error editing marker:", error);
    }
  };

  const handleCancelAddMarker = () => {
    setIsAddingMarker(false);
    setSelectedLocation(null);
  };

  const handleCancelEditMarker = () => {
    setIsEditingMarker(false);
    setSelectedLocation(null);
  };

  const handleAddMarker = () => {
    setIsAddingMarker(true);
    console.log("Zooming in");
  };

  const handleEditMarker = () => {
    setSelectedLocation(null);
    setIsEditingMarker(true);
  };

  const handleDeleteMarker = () => {
    console.log("Deleting marker");
    setSelectedLocation(null);
    setIsDeletingMarker(true);
  };

  const handleMapClick = (event) => {
    console.log("Map clicked");
    if (isAddingMarker) {
      console.log("Adding marker");
      const { lat, lng } = event.latlng;

      setNewMarkerData({
        latitude: lat,
        longitude: lng,
        title: "",
        address: "",
      });

      setSelectedLocation({
        latitude: lat,
        longitude: lng,
      });
    }
  };

  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.openPopup();
    }
  }, [selectedLocation]);

  const MapClickEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <div>
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={13}
        style={{ height: `calc(100vh - ${headerHeight}px)`, width: "100%" }}
        scrollWheelZoom={false}
        zoomControl={false}
        onClick={handleMapClick}
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
            {isEditingMarker && selectedLocation ? (
              <PopupInput
                newMarkerData={newMarkerData}
                setNewMarkerData={setNewMarkerData}
                handleSaveMarker={handleSaveEditMarker}
                handleCancelMarker={handleCancelEditMarker}
              />
            ) : (
              <Popup>
                <h3>{location.title}</h3>
                <p>{location.address}</p>
              </Popup>
            )}
          </Marker>
        ))}
        {isAddingMarker && selectedLocation && (
          <Marker
            position={[selectedLocation.latitude, selectedLocation.longitude]}
            ref={markerRef}
          >
            <PopupInput
              newMarkerData={newMarkerData}
              setNewMarkerData={setNewMarkerData}
              handleSaveMarker={handleSaveNewMarker}
              handleCancelMarker={handleCancelAddMarker}
            />
          </Marker>
        )}
        <MarkerController handleAddMarker={handleAddMarker}
          handleEditMarker={handleEditMarker}
          handleDeleteMarker={handleDeleteMarker}/>
        <ZoomControl position="bottomright" />
        <MapClickEvents />
      </MapContainer>
    </div>
  );
};

export default MapView;
