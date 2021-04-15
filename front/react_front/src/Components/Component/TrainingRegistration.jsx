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
    [limitNumber, setLimitNumber] = useState(1),
    [comment, setComment] = useState(""),
    [currentUser, setCurrentUser] = useState(""),
    [id, SetId] = useState(""),
    [gymsName, setGymsName] = useState({}),
    [isLoaded, setIsLoaded] = useState(false);

  const gender = { 男性のみ: "male", 女性のみ: "female", どちらでも可: "both" };

  const url = process.env.REACT_APP_HOST + ":3001" + "/trainings/";

  const dateFormat = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var trainingDate = year + "/" + month + "/" + day;
    return trainingDate;
  };

  const checkLoginStatus = () => {
    axios
      .get(process.env.REACT_APP_HOST + ":3001" + "/login", {
        withCredentials: true,
      })
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
      .get(process.env.REACT_APP_HOST + ":3001" + "/gyms", {
        withCredentials: true,
      })
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

  const postTraining = () => {
    axios
      .post(
        url,
        {
          training: {
            menu: menu,
            date: date,
            location: location,
            partner: partner,
            limit_number: limitNumber,
            comment: comment,
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
  };

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

  const inputLimitNumber = useCallback((event) => {
    setLimitNumber(event.target.value);
  });

  const inputComment = useCallback(
    (event) => {
      setComment(event.target.value);
    },
    [setComment]
  );

  if (!isLoaded) {
    return <p>読み込み中です</p>;
  } else {
    return (
      <div className="c-section-container">
        <h2 className="u-text__headline u-text-center">トレーニング登録</h2>
        {/* <TextInput
          fullWidth={true}
          label={"メニュー名"}
          multiline={false}
          rows={1}
          required={false}
          value={menu}
          type={"text"}
          onChange={inputMenu}
        /> */}

        <PullDownComponent
          items={{
            軽めに筋トレ: "軽めに筋トレ",
            がっつり筋トレ: "がっつり筋トレ",
            軽め派もがっつり派も歓迎: "軽め派もがっつり派も歓迎",
          }}
          label={"トレーニング強度"}
          required={true}
          fullWidth={true}
          value={menu}
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

        <PullDownComponent
          items={{ 1: 1, 2: 2, 3: 3 }}
          label={"参加人数上限"}
          required={true}
          fullWidth={true}
          value={limitNumber}
          onChange={inputLimitNumber}
        />
        <TextInput
          fullWidth={true}
          label={"コメント"}
          multiline={true}
          rows={3}
          required={false}
          value={comment}
          type={"text"}
          onChange={inputComment}
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
                if (comment.length > 50) {
                  alert("コメントは50文字以下にしてください。");
                  return false;
                }
              }
              postTraining();
            }}
          />
        </div>
      </div>
    );
  }
};

export default TrainingRegistration;
