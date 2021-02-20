import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapComponent from "./GoogleMapComponent";
import GymList from "./GymList";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
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

const GymsAndMap = () => {
  const [gyms, setGyms] = useState([]),
    [isLoaded, setIsLoaded] = useState(false);

  const classes = useStyles();

  const getGyms = () => {
    axios
      .get("http://localhost:3001/gyms", { withCredentials: true })
      .then((results) => {
        setGyms(results.data);
        setIsLoaded(true);
        console.log(results);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    getGyms();
  }, []);

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={6} className={classes.clild}>
        <GoogleMapComponent gyms={gyms} />
      </Grid>
      <Grid item xs={6} className={classes.clild}>
        <GymList />
      </Grid>
    </Grid>
  );
};

export default GymsAndMap;
