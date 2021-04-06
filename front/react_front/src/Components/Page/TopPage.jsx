import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import GoogleMapComponent from "../Component/GoogleMapComponent";
import TrainingSearchForm from "../Component/TrainingSearchForm";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "500px",
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  clild: {
    display: "inline-block",
  },
  sideBar: {
    float: "right",
    width: "100%",
    padding: "20px",
  },
  text: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
  },
}));

const TopPage = () => {
  const classes = useStyles();

  const [user, setUser] = useState([]),
    [loginUser, setLoginUser] = useState([]),
    [gyms, setGyms] = useState([]),
    [currentUser, setCurrentUser] = useState(false),
    [trainings, setTrainings] = useState([]),
    [isLoaded, setIsLoaded] = useState(false),
    [changedTraining, setChangedTraining] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const urlId = location.pathname.split("users/")[1];
  const url = process.env.REACT_APP_HOST + ":3001" + "/users/" + urlId;

  const getLoginUser = () => {
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
        alert(
          "ログインステータスエラーが起きました。通信環境をお確かめください。"
        );
        console.log("ログインステータスエラー", error);
      });
  };

  const getGyms = () => {
    axios
      .get(process.env.REACT_APP_HOST + ":3001" + "/gyms", {
        withCredentials: true,
      })
      .then((results) => {
        setGyms(results.data);
        setIsLoaded(true);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    getLoginUser();
    getGyms();
  }, []);

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} sm={6}>
        <h1 className={classes.text}>ジムマップ</h1>
        <GoogleMapComponent gyms={gyms} />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.clild}>
        <TrainingSearchForm />
        <a href="/gyms/registration">新規にジムを登録する</a>
      </Grid>
    </Grid>
  );
};

export default TopPage;
