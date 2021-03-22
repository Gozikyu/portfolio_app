import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { TextInput, PrimaryButton } from "../UIkit/index";
import GoogleMapComponent from "../Component/GoogleMapComponent";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import ChatComponent from "../Component/ChatComponent";
import TableComponent from "../Component/TabeleComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    width: "80%",
  },
  clild: {
    display: "inline-block",
  },
  table: {
    display: "block",
    margin: "0 auto",
    width: "70%",
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
      .get("http://localhost:3001/users/" + "trainings/" + trainingId, {
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
  console.log(changeState);

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
        console.log(changeState);
        setChangeState(!changeState);
        alert("トレーニングの参加申請取消が完了しました");
        console.log(changeState);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  const getTraining = () => {
    axios
      .get("http://localhost:3001/trainings/" + userId, {
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

  const getFollowers = () => {
    axios
      .get("http://localhost:3001/trainings/" + training.id + "/followers", {
        withCredentials: true,
      })
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

  console.log(followers);

  return !training.length ? (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={6}>
        <div className={classes.table}>
          <TableComponent
            className={classes.component}
            training={training}
            followers={followers}
          />
        </div>
        <GoogleMapComponent gyms={gym} />
      </Grid>
      <Grid item xs={6}>
        {training.user_id == loginUser.id ? (
          <PrimaryButton
            label={"トレーニングを削除する"}
            onClick={() => {
              if (window.confirm("削除してよろしいですか？")) {
                console.log(training.id);
                axios
                  .delete("http://localhost:3001/trainings/" + training.id, {
                    withCredentials: true,
                  })
                  .then((response) => {
                    console.log("registration res", response);
                    alert("指定したトレーニングを削除しました");
                    history.push("/users/" + loginUser.id);
                  })
                  .catch((error) => {
                    console.log("registration error", error);
                    alert(
                      "トレーニングを削除できませんでした。通信環境をご確認ください"
                    );
                  });
              }
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
        <ChatComponent training={training} />
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

export default TrainingPage;
