import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import PlaceInfo from "./PlaceInfo";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 35.681236,
  lng: 139.767125,
};

const GoogleMapComponent = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_googleMapsApiKey,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onMapLoad}
      // onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <PlaceInfo gyms={props.gyms} />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMapComponent;
