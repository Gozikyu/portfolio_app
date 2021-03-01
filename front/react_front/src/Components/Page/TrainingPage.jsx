import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { TextInput, PrimaryButton } from "../UIkit/index";
import GoogleMapComponent from "../Component/GoogleMapComponent";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "500px",
    margin: "0 auto",
  },
  clild: {
    display: "inline-block",
  },
}));

const TrainingPage = (props) => {
  const [training, setTraining] = useState([""]),
    [gym, setGym] = useState([""]),
    [loginUser, setLoginUser] = useState(""),
    [isFollowed, setIsFollowed] = useState(false),
    [changeState, setChangeState] = useState(false);

  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const trainingId = location.pathname.split("/")[4];

  const classes = useStyles();

  const dateFormat = (date) => {
    const dateObject = new Date(date);
    var year = dateObject.getFullYear();
    var month = dateObject.getMonth() + 1;
    var day = dateObject.getDate();
    var trainingDate = year + "/" + month + "/" + day;
    return trainingDate;
  };

  const url = "http://localhost:3001/trainings/" + userId;

  const getTraining = () => {
    axios
      .get(url, { withCredentials: true })
      .then((trainingData) => {
        setTraining(
          trainingData.data.find(
            (eachTraining) => eachTraining.id.toString() == trainingId
          )
        );
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const getGyms = () => {
    axios
      .get("http://localhost:3001/gyms", { withCredentials: true })
      .then((results) => {
        setGym(results.data.find((gym) => gym.name == training.location));
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          loggedInUser = response.data.user;
          setLoginUser(response.data.user);
        } else {
        }
      })
      .catch((error) => {
        console.log("ログインステータスエラー", error);
      });
  };

  const followTraining = () => {
    axios
      .post(
        "http://localhost:3001/users/" +
          loginUser.id +
          "/trainings/" +
          trainingId,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setChangeState(!changeState);
        alert("トレーニングの参加申請が完了しました");
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  const unfollowTraining = () => {
    axios
      .delete(
        "http://localhost:3001/users/" +
          loginUser.id +
          "/trainings/" +
          trainingId,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setChangeState(!changeState);
        alert("トレーニングの参加申請取消が完了しました");
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  const checkFollowed = () => {
    axios
      .get(
        "http://localhost:3001/users/" +
          loginUser.id +
          "/trainings/" +
          trainingId,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setIsFollowed(response.data.followed);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  useEffect(() => {
    getTraining();
    checkLoginStatus();
  }, []);

  useEffect(() => {
    checkFollowed();
  }, [changeState, loginUser]);

  useEffect(() => {
    getGyms();
  }, [training]);

  return !training.length ? (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={6} className={classes.clild}>
        <GoogleMapComponent gyms={gym} />
      </Grid>
      <Grid item xs={6} className={classes.clild}>
        <p>メニュー：　{training.menu}</p>
        <p>日時：　{dateFormat(training.date)}</p>
        <p>場所：　{training.location}</p>
        {isFollowed ? (
          <PrimaryButton
            label={"参加申請取り消し"}
            onClick={() => unfollowTraining()}
          />
        ) : (
          <PrimaryButton
            label={"トレーニングへの参加申請"}
            onClick={() => followTraining()}
          />
        )}
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

export default TrainingPage;
