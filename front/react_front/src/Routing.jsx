import React, { useEffect, useState } from "react";
import { PrimaryButton } from "./Components/UIkit/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import TopPage from "./Components/TopPage";
import UserMyPage from "./Components/UserMyPage";
import UserList from "./Components/UserList";
import UserProfile from "./Components/UserProfile";
import UserEdit from "./Components/UserEdit";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Auth from "./Components/Auth";
import GoogleMapComponent from "./Components/GoogleMapComponent";
import GymsAndMap from "./Components/GymsAndMap";
import GymRegistraion from "./Components/GymRegistration";
import TrainingPage from "./Components/TrainingPage";
import Header from "./Components/Header";

const Routing = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loading, setLoading] = useState(true);

  const login = () => {
    setLoggedInStatus(true);
  };

  const logout = () => {
    setLoggedInStatus(false);
  };

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          setLoggedInStatus(true);
          setLoginUser(response.data.user);
        } else {
          setLoggedInStatus(false);
        }
      })
      .catch((error) => {
        console.log("ログインステータスエラー", error);
      });
    setLoading(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header loginUser={loginUser} />
        <Switch>
          <Route exact path="/" component={TopPage} />
          <Route exact path="/users/:id" component={UserMyPage} />
          <Route exact path="/signup" component={SignUp} />

          <Route
            exact
            path={"/users/:id/edit"}
            render={(props) => <UserEdit {...props} loginUser={loginUser} />}
          />
          <Route
            exact
            path={"/signin"}
            render={(props) => (
              <SignIn
                {...props}
                loggedInStatus={loggedInStatus}
                login={login}
              />
            )}
          />

          {/* <Auth
            exact
            path={"/users"}
            loggedInStatus={loggedInStatus}
            loading={loading}
          > */}
          <Route
            exact
            path={"/users"}
            render={(props) => (
              <UserList {...props} loggedInStatus={loggedInStatus} />
            )}
          />
          {/* </Auth> */}

          <Route exact path="/gyms" component={GymsAndMap} />
          <Route exact path="/gyms/registration" component={GymRegistraion} />
          <Route
            exact
            path="/users/:userId/trainings/:trainingId"
            component={TrainingPage}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default Routing;
