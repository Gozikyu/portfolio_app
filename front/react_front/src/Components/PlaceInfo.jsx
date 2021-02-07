import React, { useState, useEffect } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import pin from "../assets/img/mappin.png";
import axios from "axios";

const PlaceInfo = () => {
  const [selected, setSelected] = useState(null);
  const [gyms, setGyms] = useState([]),
    [isLoaded, setIsLoaded] = useState(false);

  const getGyms = () => {
    axios
      .get("http://localhost:3001/gyms", { withCredentials: true })
      .then((results) => {
        setGyms(results.data);
        setIsLoaded(true);
        console.log(results);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    getGyms();
  }, []);

  if (!isLoaded) {
    return <p>読み込み中です</p>;
  } else {
    return (
      <>
        {gyms.map((gym) => (
          <Marker
            key={gym.id}
            position={{
              lat: gym.latitude,
              lng: gym.longitude,
            }}
            onMouseOver={() => {
              setSelected(gym);
              // マウスオーバーで<InfoWindow>が描画されます。
            }}
            icon={{
              url: pin,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
              // ここでアイコン表示の設定ができます。
            }}
          />
        ))}
        {selected ? (
          // MarkerにマウスオーバーされたときにInfoWindowが表示されます。
          <InfoWindow
            position={{
              lat: selected.latitude,
              lng: selected.longitude,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>{selected.name}</div>
          </InfoWindow>
        ) : null}
      </>
    );
  }
};

export default PlaceInfo;