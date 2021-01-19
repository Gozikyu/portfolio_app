import React from "react";
import { Redirect } from "react-router-dom";

const Auth = (props) => {
  if (props.loggedInStatus) {
    return <Redirect to={"/"} />;
  } else {
    return props.children;
  }
};
export default Auth;
