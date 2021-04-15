import React from "react";
import { PrimaryButton } from "../UIkit/index";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import appTopPage from "../../assets/img/AppTopPage.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    margin: "0 auto",
    background: "rgba(255,255,255,0.6)",
    backgroundBlendMode: "lighten",
    backgroundImage: `url(${appTopPage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: "6rem",
    paddingTop: "3rem",
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
    backgroundColor: "#41b6e6",
    color: "#000",
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
        <p className={classes.titleText}>Muscle Mate</p>
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
