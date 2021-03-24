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
  const url = "http://localhost:3001/users/" + urlId;

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

  const getGyms = () => {
    axios
      .get("http://localhost:3001/gyms", { withCredentials: true })
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
        <GoogleMapComponent gyms={gyms} />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.clild}>
        <TrainingSearchForm />
      </Grid>
    </Grid>
  );
};

export default TopPage;
