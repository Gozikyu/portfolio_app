import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import TrainingRegistration from "./Component/TrainingRegistration";
import TrainingList from "./TrainingList";
import TrainingSearchForm from "./Component/TrainingSearchForm";
import CalendarComponent from "./Component/CalendarComponent";

const UserProfile = () => {
  const [user, setUser] = useState([]),
    [currentUser, setCurrentUser] = useState(false),
    [trainings, setTrainings] = useState([]),
    [isLoaded, setIsLoaded] = useState(false),
    [changedTraining, setChangedTraining] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const urlId = location.pathname.split("users/")[1];
  const url = "http://localhost:3001/users/" + urlId;

  const checkCorrectUser = () => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          const loginUserId = response.data.user.id;
          if (urlId == loginUserId) {
            setCurrentUser(true);
            setIsLoaded(true);
            return;
          } else {
            history.push("/");
          }
        } else {
        }
      })
      .catch((error) => {
        alert(
          "ログインステータスエラーが起きました。通信環境をお確かめください。"
        );
        console.log("ログインステータスエラー", error);
      });
  };

  const getTraining = () => {
    axios
      .get("http://localhost:3001/trainings/" + urlId, {
        withCredentials: true,
      })
      .then((results) => {
        setTrainings(results.data);
        setIsLoaded(true);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    checkCorrectUser();
    getTraining();
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(url)
      .then((results) => {
        setUser(results.data);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  if (currentUser) {
    return (
      <div className="UserProfile">
        <p> id:{user.id}</p>
        {user.name}
        <TrainingRegistration
          changedTraining={changedTraining}
          setChangedTraining={setChangedTraining}
        />
        <TrainingList
          changedTraining={changedTraining}
          setChangedTraining={setChangedTraining}
        />
        <TrainingSearchForm />
        <CalendarComponent trainings={trainings} />
      </div>
    );
  } else {
    return <p> id:{user.id}</p>;
  }
};

export default UserProfile;
