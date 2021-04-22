import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import TopPage from "./Components/Page/TopPage";
import TrainingPage from "./Components/Page/TrainingPage";
import UserMyPage from "./Components/Page/UserMyPage";
import UserEdit from "./Components/Page/UserEdit";
import SignUp from "./Components/Page/SignUp";
import SignIn from "./Components/Page/SignIn";
import SearchResultPage from "./Components/Page/SearchResultPage";
import Auth from "./Auth";
import GymRegistraion from "./Components/Component/GymRegistration";
import Header from "./Components/Component/Header";
import NotFound from "./Components/Page/NotFound";
import AppTopPage from "./Components/Page/AppTopPage";

const Routing = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [isloaded, setIsLoaded] = useState(true);

  const history = useHistory();

  const login = () => {
    setLoggedInStatus(true);
  };

  const logout = () => {
    setLoggedInStatus(false);
  };

  const checkLoginStatus = () => {
    axios
      .get(process.env.REACT_APP_HOST + ":3001" + "/login", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.logged_in) {
          setLoginUser(response.data.user);
          setLoggedInStatus(true);
        } else {
          setLoggedInStatus(false);
        }
      })
      .catch((error) => {
        console.log("ログインステータスエラー", error);
      });
    setIsLoaded(true);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (!isloaded) {
    return <div>読み込み中です</div>;
  } else {
    return (
      <div className="App">
        <Router>
          <Header
            loginUser={loginUser}
            logout={logout}
            loggedInStatus={loggedInStatus}
          />
          <Switch>
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
            <Route exact path="/appTopPage" component={AppTopPage} />
            <Route
              exact
              path={"/signup"}
              render={(props) => (
                <SignUp
                  {...props}
                  loggedInStatus={loggedInStatus}
                  login={login}
                />
              )}
            />

            <Auth loggedInStatus={loggedInStatus}>
              <Switch>
                <Route exact path="/" component={TopPage} />
                <Route exact path="/users/:id" component={UserMyPage} />

                <Route
                  exact
                  path={"/users/:id/edit"}
                  render={(props) => (
                    <UserEdit {...props} loginUser={loginUser} />
                  )}
                />

                <Route
                  exact
                  path="/gyms/registration"
                  component={GymRegistraion}
                />
                <Route
                  exact
                  path="/users/:userId/trainings/:trainingId"
                  component={TrainingPage}
                />

                <Route
                  exact
                  path="/searchResult"
                  component={SearchResultPage}
                />

                <Route component={NotFound} />
              </Switch>
            </Auth>
          </Switch>
        </Router>
      </div>
    );
  }
};

export default Routing;
