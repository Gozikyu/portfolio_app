import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import logo from "../assets/img/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#41b6e6",
    // marginBottom: "2rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const [loggedInStatus, setLoggedInStatus] = useState(true);

  const classes = useStyles();
  const history = useHistory();

  const pushToMyPage = () => {
    history.push("/users/" + props.loginUser.id);
  };

  const pushToTopPage = () => {
    history.push("/");
  };

  const logout = () => {
    if (window.confirm("ログアウトしてよろしいですか？")) {
      axios
        .delete(process.env.REACT_APP_HOST + ":3001" + "/logout", {
          withCredentials: true,
        })
        .then((response) => {
          alert("ログアウトしました");
          props.logout();
          history.push("/signin");
        })
        .catch((error) => {
          console.log("registration error", error);
          alert("ログアウトできませんでした。通信環境をご確認ください。");
        });
    }
  };

  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <AppBar position="static" className={classes.root}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => pushToTopPage()}
              >
                <img src={logo} alt="logo" style={{ height: 80 }} />
              </IconButton>
              {props.loggedInStatus && (
                <>
                  <Typography variant="h6" className={classes.title}>
                    {props.loginUser.name}
                  </Typography>
                  <Button color="inherit" onClick={() => pushToMyPage()}>
                    My Page
                  </Button>
                  <Button color="inherit" onClick={() => logout()}>
                    Logout
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Switch>
      </Router>
    </div>
  );
};

export default Header;
