import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import TrainingRegistration from "../Component/TrainingRegistration";
import CalendarComponent from "../Component/CalendarComponent";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "500px",
    margin: "0 auto",
    width: "100%",
  },
  clild: {
    display: "inline-block",
  },
}));

const UserMyPage = () => {
  const [loginUser, setLoginUser] = useState([]),
    [currentUser, setCurrentUser] = useState(false),
    [trainings, setTrainings] = useState([]),
    [isLoaded, setIsLoaded] = useState(false),
    [changedTraining, setChangedTraining] = useState(false);

  const classes = useStyles();

  const history = useHistory();

  const getLoginUser = () => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          setLoginUser(response.data.user);
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
      .get("http://localhost:3001/trainings/" + loginUser.id, {
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
    getLoginUser();
  }, []);

  useEffect(() => {
    getTraining();
  }, [loginUser, changedTraining]);

  return (
    <div>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} sm={6} className={classes.clild}>
          <div className={classes.calendar}>
            <CalendarComponent trainings={trainings} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.clild}>
          <TrainingRegistration
            changedTraining={changedTraining}
            setChangedTraining={setChangedTraining}
          />
          <a href={"/users/" + loginUser.id + "/edit"}>ユーザー情報変更</a>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserMyPage;
