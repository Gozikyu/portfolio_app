import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import pin from "../../assets/img/gym.png";

const PlaceInfo = (props) => {
  const [selected, setSelected] = useState(null);

  if (props.gyms == undefined || props.gyms.length == 0) {
    return "loading";
  } else if (!Array.isArray(props.gyms)) {
    return (
      <>
        <Marker
          key={props.gyms.id}
          position={{
            lat: parseFloat(props.gyms.latitude),
            lng: parseFloat(props.gyms.longitude),
          }}
          onMouseOver={() => {
            setSelected(props.gyms);
            // マウスオーバーで<InfoWindow>が描画されます。
            console.log(selected);
          }}
          icon={{
            url: pin,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
            // ここでアイコン表示の設定ができます。
          }}
        />

        {selected ? (
          // MarkerにマウスオーバーされたときにInfoWindowが表示されます。
          <InfoWindow
            position={{
              lat: parseFloat(selected.latitude),
              lng: parseFloat(selected.longitude),
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <a href={selected.url} target="_blank">
              <div>{selected.name}</div>
            </a>
          </InfoWindow>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        {props.gyms.map((gym) => (
          <Marker
            key={gym.id}
            position={{
              lat: parseFloat(gym.latitude),
              lng: parseFloat(gym.longitude),
            }}
            onMouseOver={() => {
              setSelected(gym);
              // マウスオーバーで<InfoWindow>が描画されます。
              console.log(selected);
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
              lat: parseFloat(selected.latitude),
              lng: parseFloat(selected.longitude),
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <a href={selected.url} target="_blank">
              <div>{selected.name}</div>
            </a>
          </InfoWindow>
        ) : null}
      </>
    );
  }
};

export default PlaceInfo;
