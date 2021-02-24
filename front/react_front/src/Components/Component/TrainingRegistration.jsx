import React, { useCallback, useEffect, useState } from "react";
import { TextInput, PrimaryButton } from "../UIkit/index";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PullDownComponent from "./PullDownComponent";
import DatePickerComponent from "./DatePickerComponent";

const TrainingRegistration = (props) => {
  const history = useHistory();

  const [menu, setMenu] = useState(""),
    [date, setDate] = useState(new Date()),
    [location, setLocation] = useState(""),
    [partner, setPartner] = useState(""),
    [currentUser, setCurrentUser] = useState(""),
    [id, SetId] = useState(""),
    [gymsName, setGymsName] = useState({}),
    [isLoaded, setIsLoaded] = useState(false);

  const gender = { 男性のみ: "male", 女性のみ: "female", どちらでも可: "both" };

  const url = "http://localhost:3001/trainings/";

  const dateFormat = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var trainingDate = year + "/" + month + "/" + day;
    return trainingDate;
  };

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        setCurrentUser(response.data.user);
        SetId(response.data.user.id);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const getGyms = () => {
    axios
      .get("http://localhost:3001/gyms", { withCredentials: true })
      .then((results) => {
        results.data.map((gym) => {
          gymsName[gym.name] = gym.name;
        });
        setIsLoaded(true);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    checkLoginStatus();
    getGyms();
  }, []);

  const inputMenu = useCallback(
    (event) => {
      setMenu(event.target.value);
    },
    [setMenu]
  );

  const inputDate = useCallback(
    (date) => {
      setDate(dateFormat(date));
    },
    [setDate]
  );

  const inputLocation = useCallback(
    (event) => {
      setLocation(event.target.value);
    },
    [setLocation]
  );

  const inputPartner = useCallback(
    (event) => {
      setPartner(event.target.value);
    },
    [setPartner]
  );
  if (!isLoaded) {
    return <p>読み込み中です</p>;
  } else {
    return (
      <div className="c-section-container">
        <h2 className="u-text__headline u-text-center">トレーニング登録</h2>
        <div className="module-spacer--medium" />
        <TextInput
          fullWidth={true}
          label={"メニュー名"}
          multiline={false}
          rows={1}
          required={false}
          value={menu}
          type={"text"}
          onChange={inputMenu}
        />

        <DatePickerComponent
          date={date}
          inputDate={inputDate}
          label={"トレーニング日"}
          required={true}
          fullWidth={true}
        />

        <PullDownComponent
          items={gymsName}
          label={"場所"}
          required={true}
          fullWidth={true}
          value={location}
          onChange={inputLocation}
        />

        <PullDownComponent
          items={gender}
          label={"希望パートナー"}
          required={true}
          fullWidth={true}
          value={partner}
          onChange={inputPartner}
        />

        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={"トレーニングを登録する"}
            onClick={() => {
              if (date === "" || location === "" || partner === "") {
                alert("必須項目が入力されていません。");
                return false;
              }
              {
                if (partner == "男性のみ") {
                  setPartner("male");
                } else if (partner == "女性のみ") {
                  setPartner("female");
                } else {
                  setPartner("both");
                }
              }

              axios
                .post(
                  url,
                  {
                    training: {
                      menu: menu,
                      date: date,
                      location: location,
                      partner: partner,
                    },
                  },
                  { withCredentials: true }
                )
                .then((response) => {
                  props.setChangedTraining(true);
                  alert("トレーニングの登録が完了しました");
                })
                .catch((error) => {
                  console.log("registration error", error);
                });
            }}
          />
        </div>
      </div>
    );
  }
};

export default TrainingRegistration;
