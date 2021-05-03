import React from "react";
import { PrimaryButton } from "../UIkit/index";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import appTopPage from "../../assets/img/AppTopPage.png";
import logo from "../../assets/img/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    margin: " auto",
    background: "rgba(255,255,255,0.6)",
    backgroundBlendMode: "lighten",
    backgroundImage: `url(${appTopPage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  titleText: {
    paddingTop: "3rem",
    width: "50%",
    backgroundColor: "000",
    margin: "0 auto",
  },

  subTitleText: {
    fontWeight: "bold",
    marginTop: "0",
    fontSize: "1.5rem",
    marginBottom: "2rem",
  },
  bodyText: {
    marginBottom: "2rem",
  },
  button: {
    backgroundColor: "#DDE101",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
    display: "block",
    margin: "0 auto",
  },
}));

const AppTopPage = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const pushToSignInPage = () => {
    history.push("/signin");
  };
  const pushToSignUpPage = () => {
    history.push("/signup");
  };

  const guestSignIn = () => {
    axios
      .post(
        process.env.REACT_APP_HOST + ":3001" + "/login",
        {
          user: {
            email: "guest@gmail.com",
            password: "password",
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("registration res", response);
        const createdId = response.data.user_id;
        console.log(createdId);
        props.login();
        history.push({ pathname: "/users/" + createdId });
      })
      .catch((error) => {
        console.log("registration error", error);
        alert(
          "ゲストアカウントでログインできませんでした。通信環境をご確認ください。"
        );
      });
  };

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.titleText}>
          <img src={logo} alt="logo" />
        </div>
        <p className={classes.subTitleText}>トレーニング仲間マッチングアプリ</p>
      </div>
      <Button
        className={classes.button}
        variant="contained"
        onClick={() => pushToSignInPage()}
      >
        ログイン
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        onClick={() => pushToSignUpPage()}
      >
        ユーザー登録
      </Button>

      <Button
        className={classes.button}
        variant="contained"
        onClick={() => guestSignIn()}
      >
        ゲストアカウントでログイン
      </Button>
    </div>
  );
};

export default AppTopPage;
