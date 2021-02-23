import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import GoogleMapComponent from "./GoogleMapComponent";
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
    [gym, setGym] = useState([""]);

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

  useEffect(() => {
    getTraining();
  }, []);

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
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

export default TrainingPage;
