import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { PrimaryButton } from "../UIkit/index";
import GoogleMapComponent from "../Component/GoogleMapComponent";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ChatComponent from "../Component/ChatComponent";
import TableComponent from "../Component/TabeleComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    width: "80%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  clild: {
    display: "inline-block",
  },
  table: {
    display: "block",
    margin: "0 auto",
    width: "70%",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  chat: {
    marginBottom: "1rem",
  },
}));

const TrainingPage = (props) => {
  const classes = useStyles();

  const [training, setTraining] = useState([""]),
    [gym, setGym] = useState([""]),
    [loginUser, setLoginUser] = useState(""),
    [isFollowed, setIsFollowed] = useState(false),
    [changeState, setChangeState] = useState(false),
    [followers, setFollowers] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const userId = location.pathname.split("/")[2];
  const trainingId = location.pathname.split("/")[4];

  const followTraining = () => {
    axios
<<<<<<< HEAD
      .get("http://52.195.8.187:3001/users/" + "trainings/" + trainingId, {
=======
      .get(process.env.REACT_APP_HOST + "/users/" + "trainings/" + trainingId, {
>>>>>>> 48a5881d3d94ffa875f585ccb27da2e9b8d81c44
        withCredentials: true,
      })
      .then((response) => {
        console.log(changeState);
        setChangeState(!changeState);
        alert("トレーニングの参加申請が完了しました");
        console.log(changeState);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  const unfollowTraining = () => {
    axios
      .delete(
<<<<<<< HEAD
        "http://52.195.8.187:3001/users/" +
=======
        process.env.REACT_APP_HOST +
          "/users/" +
>>>>>>> 48a5881d3d94ffa875f585ccb27da2e9b8d81c44
          loginUser.id +
          "/trainings/" +
          trainingId,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(changeState);
        setChangeState(!changeState);
        alert("トレーニングの参加申請取消が完了しました");
        console.log(changeState);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  const deleteTraining = () => {
    if (window.confirm("削除してよろしいですか？"))
      axios
<<<<<<< HEAD
        .delete("http://52.195.8.187:3001/trainings/" + training.id, {
=======
        .delete(process.env.REACT_APP_HOST + "/trainings/" + training.id, {
>>>>>>> 48a5881d3d94ffa875f585ccb27da2e9b8d81c44
          withCredentials: true,
        })
        .then((response) => {
          console.log("registration res", response);
          alert("指定したトレーニングを削除しました");
          history.push("/users/" + loginUser.id);
        })
        .catch((error) => {
          console.log("registration error", error);
          alert("トレーニングを削除できませんでした。通信環境をご確認ください");
        });
  };

  const getTraining = () => {
    axios
<<<<<<< HEAD
      .get("http://52.195.8.187:3001/trainings/" + userId, {
=======
      .get(process.env.REACT_APP_HOST + "/trainings/" + userId, {
>>>>>>> 48a5881d3d94ffa875f585ccb27da2e9b8d81c44
        withCredentials: true,
      })
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
<<<<<<< HEAD
      .get("http://52.195.8.187:3001/gyms", { withCredentials: true })
=======
      .get(process.env.REACT_APP_HOST + "/gyms", { withCredentials: true })
>>>>>>> 48a5881d3d94ffa875f585ccb27da2e9b8d81c44
      .then((results) => {
        setGym(results.data.find((gym) => gym.name == training.location));
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const checkLoginStatus = () => {
    axios
<<<<<<< HEAD
      .get("http://52.195.8.187:3001/login", { withCredentials: true })
=======
      .get(process.env.REACT_APP_HOST + "/login", { withCredentials: true })
>>>>>>> 48a5881d3d94ffa875f585ccb27da2e9b8d81c44
      .then((response) => {
        if (response.data.logged_in) {
          setLoginUser(response.data.user);
        } else {
        }
      })
      .catch((error) => {
        console.log("ログインステータスエラー", error);
      });
  };

  const checkFollowed = () => {
    axios
      .get(
<<<<<<< HEAD
        "http://52.195.8.187:3001/users/" +
=======
        process.env.REACT_APP_HOST +
          "/users/" +
>>>>>>> 48a5881d3d94ffa875f585ccb27da2e9b8d81c44
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

  const getFollowers = () => {
    axios
<<<<<<< HEAD
      .get("http://52.195.8.187:3001/trainings/" + training.id + "/followers", {
        withCredentials: true,
      })
=======
      .get(
        process.env.REACT_APP_HOST + "/trainings/" + training.id + "/followers",
        {
          withCredentials: true,
        }
      )
>>>>>>> 48a5881d3d94ffa875f585ccb27da2e9b8d81c44
      .then((response) => {
        setFollowers(response.data);
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
    getTraining();
  }, [changeState]);

  useEffect(() => {
    checkFollowed();
  }, [changeState, loginUser]);

  useEffect(() => {
    getGyms();
    getFollowers();
  }, [training, changeState]);

  return !training.length ? (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} sm={6}>
        <div className={classes.table}>
          <TableComponent
            className={classes.component}
            training={training}
            followers={followers}
          />
        </div>
        <GoogleMapComponent gyms={gym} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className={classes.chat}>
          {(isFollowed || training.user_id == loginUser.id) && (
            <ChatComponent training={training} />
          )}
        </div>
        {training.user_id == loginUser.id ? (
          <PrimaryButton
            label={"トレーニングを削除する"}
            onClick={() => {
              deleteTraining();
            }}
          />
        ) : isFollowed ? (
          <PrimaryButton
            label={"参加申請取り消し"}
            onClick={() => unfollowTraining()}
          />
        ) : followers.length >= training.limit_number ? (
          <p class="warning">トレーニングの参加人数上限に達しています</p>
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
