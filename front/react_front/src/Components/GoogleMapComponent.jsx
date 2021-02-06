import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import PlaceInfo from "./PlaceInfo";
import GymList from "./GymList";
import Grid from "@material-ui/core/Grid";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 35.681236,
  lng: 139.767125,
};

const GoogleMapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_googleMapsApiKey,
  });
  // const [map, setMap] = useState(null);

  // const onLoad = useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  //API読み込み後に再レンダーを引き起こさないため、useStateを使わず、useRefとuseCallbackを使っています。

  // const onUnmount = useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onMapLoad}
      // onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
      <PlaceInfo />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMapComponent;
