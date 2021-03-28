import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Auth = (props) => {
  const [loggedInStatus, setLoggedInStatus] = useState(""),
    [loaded, setLoaded] = useState(false);

  const history = useHistory();

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        console.log("check");
        setLoggedInStatus(response.data.logged_in);
        setLoaded(true);
        if (response.data.logged_in) {
          return;
        } else {
          alert("ログインして下さい");
          history.push("/signin");
        }
      });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);
  if (!loaded) {
    return <p>読み込み中です</p>;
  } else {
    return loggedInStatus ? props.children : <></>;
  }
};
export default Auth;
