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
import headerLogo from "../../assets/img/headerlogo.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  user: {
    flexGrow: 1,
    color: "#000",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  buttonArea: {
    marginRight: "3rem",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  button: {
    color: "#000",
    backgroundColor: "#DDE101",
    margin: "0 1rem",
    padding: "1rem 1.5rem",
    borderRadius: "0",
  },
  menuIcon: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      margin: "0 0 0 auto",
    },
  },
}));

const Header = (props) => {
  const [loggedInStatus, setLoggedInStatus] = useState(true),
    [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const history = useHistory();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pushToMyPage = () => {
    history.push("/users/" + props.loginUser.id);
    handleClose();
  };

  const pushToTopPage = () => {
    history.push("/top");
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
          handleClose();
        })
        .catch((error) => {
          console.log("registration error", error);
          alert("ログアウトできませんでした。通信環境をご確認ください。");
        });
    }
  };

  return (
    <>
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
                  <img
                    src={headerLogo}
                    alt="headerLogo"
                    style={{ height: 80 }}
                  />
                </IconButton>
                {props.loggedInStatus && (
                  <>
                    <Typography variant="h6" className={classes.user}>
                      ログイン中：{props.loginUser.name}
                    </Typography>
                    <div className={classes.buttonArea}>
                      <Button
                        onClick={() => pushToMyPage()}
                        className={classes.button}
                      >
                        My Page
                      </Button>
                      <Button
                        onClick={() => logout()}
                        className={classes.button}
                      >
                        Logout
                      </Button>
                    </div>
                  </>
                )}
                <div className={classes.menuIcon}>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        // maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    <MenuItem
                      // selected={option === "Pyxis"}
                      onClick={pushToMyPage}
                    >
                      マイページ
                    </MenuItem>
                    <MenuItem
                      // selected={option === "Pyxis"}
                      onClick={logout}
                    >
                      ログアウト
                    </MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default Header;
