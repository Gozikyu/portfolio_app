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
    marginTop: "2rem ",
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
      .get(
        process.env.REACT_APP_HOST +
          ":3001" +
          "/users/" +
          "trainings/" +
          trainingId,
        {
          withCredentials: true,
        }
      )
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
        process.env.REACT_APP_HOST +
          ":3001" +
          "/users/" +
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
        .delete(
          process.env.REACT_APP_HOST + ":3001" + "/trainings/" + training.id,
          {
            withCredentials: true,
          }
        )
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
      .get(process.env.REACT_APP_HOST + ":3001" + "/trainings/" + userId, {
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
      .get(process.env.REACT_APP_HOST + ":3001" + "/gyms", {
        withCredentials: true,
      })
      .then((results) => {
        setGym(results.data.find((gym) => gym.name == training.location));
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const checkLoginStatus = () => {
    axios
      .get(process.env.REACT_APP_HOST + ":3001" + "/login", {
        withCredentials: true,
      })
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
        process.env.REACT_APP_HOST +
          ":3001" +
          "/users/" +
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
      .get(
        process.env.REACT_APP_HOST +
          ":3001" +
          "/trainings/" +
          training.id +
          "/followers",
        {
          withCredentials: true,
        }
      )
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
