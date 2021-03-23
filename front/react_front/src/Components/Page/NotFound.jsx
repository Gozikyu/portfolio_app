import React from "react";
import { PrimaryButton } from "../UIkit/index";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { parseClassNames } from "@fullcalendar/common";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    margin: "0 auto",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  bodyText: {
    marginBottom: "2rem",
  },
}));

const NotFound = () => {
  const history = useHistory();
  const classes = useStyles();

  const pushToTopPage = () => {
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.titleText}>404:Not Found</h1>
      <p className={classes.bodyText}>
        お探しのページは一時的にアクセスができない状況にあるか、
        移動もしくは削除された可能性があります。
        また、URLに誤りがないか再度ご確認ください。
      </p>
      <PrimaryButton onClick={pushToTopPage} label="トップ画面へ" />
    </div>
  );
};

export default NotFound;
