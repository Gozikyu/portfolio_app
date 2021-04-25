import React from "react";
import { PrimaryButton } from "../UIkit/index";
import { useHistory } from "react-router-dom";
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

const AppTopPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const pushToSignInPage = () => {
    history.push("/signin");
  };
  const pushToSignUpPage = () => {
    history.push("/signup");
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
    </div>
  );
};

export default AppTopPage;
