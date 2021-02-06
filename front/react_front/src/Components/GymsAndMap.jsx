import React, { useState } from "react";
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
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={6} className={classes.clild}>
        <GoogleMapComponent />
      </Grid>
      <Grid item xs={6} className={classes.clild}>
        <GymList />
      </Grid>
    </Grid>
  );
};

export default GymsAndMap;
