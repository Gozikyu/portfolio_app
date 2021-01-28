import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const Auth = (props) => {
  const history = useHistory();

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        console.log("registration res", response.data);
        if (response.data.logged_in) {
          return;
        } else {
          alert("please login");
          history.push("/signin");
        }
      });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (props.loading) {
    console.log(props.loading);
    console.log(props.loggedInStatus);
    return <p>読み込み中です!!!!</p>;
    // } else if (props.loading == false && props.loggedInStatus == false) {
    //   console.log(props.loading);
    //   console.log(props.loggedInStatus);
    //   alert("ログインが必要です");
    //   // return "hoge";
    //   return <Redirect to={"/singin"} />;
  } else {
    return props.children;
  }
};
export default Auth;
