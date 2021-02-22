import React from "react";
import {
  BrowserRouter as Router,
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
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../assets/img/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#41b6e6",
    marginBottom: "2rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const pushToMyPage = () => {
    history.push("/users/" + props.loginUserId);
  };

  const pushToTopPage = () => {
    history.push("/");
  };

  const logout = () => {
    if (window.confirm("ログアウトしてよろしいですか？")) {
      axios
        .delete("http://localhost:3001/logout", {
          withCredentials: true,
        })
        .then((response) => {
          alert("ログアウトしました");
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
                {/* <MenuIcon /> */}
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                News
              </Typography>
              <Button color="inherit" onClick={() => pushToMyPage()}>
                My Page
              </Button>
              <Button color="inherit" onClick={() => logout()}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Switch>
      </Router>
    </div>
  );
};

export default Header;
