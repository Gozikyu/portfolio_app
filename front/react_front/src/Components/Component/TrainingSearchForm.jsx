import React, { useCallback, useEffect, useState } from "react";
import { TextInput, PrimaryButton } from "../UIkit/index";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PullDownComponent from "./PullDownComponent";
import DatePickerComponent from "./DatePickerComponent";

const TrainingSearchForm = (props) => {
  const history = useHistory();

  const [menu, setMenu] = useState(""),
    [date, setDate] = useState(new Date()),
    [location, setLocation] = useState(""),
    [partner, setPartner] = useState(""),
    [limitNumber, setLimitNumber] = useState(1),
    [currentUser, setCurrentUser] = useState(""),
    [searchedTrainings, setSearchedTrainings] = useState([]),
    [allTrainings, setAllTrainings] = useState({}),
    [gymsName, setGymsName] = useState({}),
    [isLoaded, setIsLoaded] = useState(false);

  const gender = {
    指定しない: "",
    男性のみ: "male",
    女性のみ: "female",
    どちらでも可: "both",
  };

  const searchTrainings = () => {
    axios
      .post(
        "http://52.195.8.187:3001/trainings/search",
        {
          search: {
            menu: menu,
            date: date,
            location: location,
            partner: partner,
            limit_number: limitNumber,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        setSearchedTrainings(response.data);
        console.log(response);
        console.log(date);
        history.push({
          pathname: "/searchResult",
          state: { training: response.data },
        });
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  const checkLoginStatus = () => {
    axios
      .get("http://52.195.8.187:3001/login", { withCredentials: true })
      .then((response) => {
        setCurrentUser(response.data.user);
        if (response.data.logged_in) {
          return;
        } else {
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const getAllTrainings = () => {
    axios
      .get("http://52.195.8.187:3001/trainings", { withCredentials: true })
      .then((results) => {
        setAllTrainings(results.data);
        setIsLoaded(true);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const getGyms = () => {
    axios
      .get("http://52.195.8.187:3001/gyms", { withCredentials: true })
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
    getAllTrainings();
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
      setDate(date);
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

  if (!isLoaded) {
    return <p>読み込み中です</p>;
  } else {
    return (
      <div className="c-section-container">
        <h2 className="u-text__headline u-text-center">トレーニング検索</h2>
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
        <PullDownComponent
          items={{ 指定しない: "", 1: 1, 2: 2, 3: 3 }}
          label={"参加人数上限"}
          required={true}
          fullWidth={true}
          value={limitNumber}
          onChange={inputLimitNumber}
        />

        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={"トレーニングを検索する"}
            onClick={() => searchTrainings()}
          />
        </div>
      </div>
    );
  }
};

export default TrainingSearchForm;
