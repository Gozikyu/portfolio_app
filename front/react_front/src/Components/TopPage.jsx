import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import GoogleMapComponent from "./GoogleMapComponent";
import TrainingSearchForm from "./TrainingSearchForm";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "500px",
    margin: "0 auto",
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
          alert("ログインしてください");
          history.push("/signin");
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
        console.log(results);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  //   const checkCorrectUser = () => {
  //     axios
  //       .get("http://localhost:3001/login", { withCredentials: true })
  //       .then((response) => {
  //         if (response.data.logged_in) {
  //           const loginUserId = response.data.user.id;
  //           if (urlId == loginUserId) {
  //             setCurrentUser(true);
  //             setIsLoaded(true);
  //             return;
  //           } else {
  //             history.push("/");
  //           }
  //         } else {
  //           alert("ログインしてください");
  //           history.push("/signin");
  //         }
  //       })
  //       .catch((error) => {
  //         alert(
  //           "ログインステータスエラーが起きました。通信環境をお確かめください。"
  //         );
  //         console.log("ログインステータスエラー", error);
  //       });
  //   };

  //   const getTraining = () => {
  //     axios
  //       .get("http://localhost:3001/trainings/" + urlId, {
  //         withCredentials: true,
  //       })
  //       .then((results) => {
  //         setTrainings(results.data);
  //         setIsLoaded(true);
  //       })
  //       .catch((data) => {
  //         console.log(data);
  //       });
  //   };

  useEffect(() => {
    getLoginUser();
    getGyms();
    // checkCorrectUser();
    // getTraining();
    // getUser();
  }, []);

  //   const getUser = () => {
  //     axios
  //       .get(url)
  //       .then((results) => {
  //         setUser(results.data);
  //       })
  //       .catch((data) => {
  //         console.log(data);
  //       });
  //   };

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={6} className={classes.clild}>
        <GoogleMapComponent gyms={gyms} />
      </Grid>
      <Grid item xs={6} className={classes.clild}>
        <TrainingSearchForm />
      </Grid>
    </Grid>
  );
};

export default TopPage;
