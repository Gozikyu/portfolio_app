import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../UIkit/index";
import axios from "axios";
import { useHistory } from "react-router-dom";

const GymRegistraion = () => {
  const history = useHistory();

  const [gymName, setGymName] = useState(""),
    [latitude, setLatitude] = useState(""),
    [longitude, setLongitude] = useState(""),
    [url, setUrl] = useState("");

  const inputGymName = useCallback(
    (event) => {
      setGymName(event.target.value);
    },
    [setGymName]
  );

  const inputLatitude = useCallback(
    (event) => {
      setLatitude(event.target.value);
    },
    [setLatitude]
  );

  const inputLongtude = useCallback(
    (event) => {
      setLongitude(event.target.value);
    },
    [setLongitude]
  );

  const inputUrl = useCallback(
    (event) => {
      setUrl(event.target.value);
    },
    [setUrl]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">ジム登録</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={"ジム名"}
        multiline={false}
        rows={1}
        required={true}
        value={gymName}
        type={"text"}
        onChange={inputGymName}
      />
      <TextInput
        fullWidth={true}
        label={"ジムの緯度"}
        multiline={false}
        rows={1}
        required={true}
        value={latitude}
        type={"text"}
        onChange={inputLatitude}
      />
      <TextInput
        fullWidth={true}
        label={"ジムの経度"}
        multiline={false}
        rows={1}
        required={true}
        value={longitude}
        type={"text"}
        onChange={inputLongtude}
      />
      <TextInput
        fullWidth={true}
        label={"ジムのURL"}
        multiline={false}
        rows={1}
        required={true}
        value={url}
        type={"text"}
        onChange={inputUrl}
      />

      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"ジムを登録する"}
          onClick={() => {
            if (gymName === "" || latitude === "" || longitude === "") {
              alert("必須項目が入力されていません。");
              return false;
            }
            if (90 < latitude || latitude < -90) {
              alert("緯度は-90~90の間で入力してください");
              return false;
            }
            if (180 < longitude || longitude < -180) {
              alert("経度は-180~0の間で入力してください");
              return false;
            }

            axios
              .post(
                "http://localhost:3001/gyms",
                {
                  gym: {
                    name: gymName,
                    latitude: latitude,
                    longitude: longitude,
                    url: url,
                  },
                },
                { withCredentials: true }
              )
              .then((response) => {
                console.log("registration res", response);
              })
              .catch((error) => {
                console.log("registration error", error);
              });
            // event.preventDefault()
          }}
        />
      </div>
    </div>
  );
};

export default GymRegistraion;
