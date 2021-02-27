import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
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
          alert("ログインして下さい");
          history.push("/signin");
        }
      });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (props.loading) {
    return <p>読み込み中です</p>;
  } else {
    return props.children;
  }
};
export default Auth;
