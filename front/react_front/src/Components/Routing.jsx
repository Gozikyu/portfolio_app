import React, { useEffect, useState } from "react";
import { PrimaryButton } from "./UIkit/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import UserList from "./UserList";
import UserProfile from "./UserProfile";
import UserEdit from "./UserEdit";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Auth from "./Auth";
import GoogleMapComponent from "./GoogleMapComponent";
import GymsAndMap from "./GymsAndMap";
import GymRegistraion from "./GymRegistration";
import TrainingPage from "./TrainingPage";

const Routing = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
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
        console.log("registration res", response.data);
        if (response.data.logged_in) {
          setLoggedInStatus(true);
          setCurrentUserId(response.data.user.id);
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
      id: {currentUserId}
      {loggedInStatus && (
        <PrimaryButton
          label={"ログアウトする"}
          onClick={
            () =>
              axios
                .delete("http://localhost:3001/logout", {
                  withCredentials: true,
                })
                .then((response) => {
                  console.log("registration res", response);
                  logout();
                })
                .catch((error) => {
                  console.log("registration error", error);
                  alert(
                    "ログアウトできませんでした。通信環境をご確認ください。"
                  );
                })
            // event.preventDefault()
          }
        />
      )}
      <Router>
        <Switch>
          <Route exact path="/users/:id" component={UserProfile} />
          <Route exact path="/signup" component={SignUp} />

          <Route
            exact
            path={"/users/:id/edit"}
            render={(props) => (
              <UserEdit {...props} currentUserId={currentUserId} />
            )}
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
