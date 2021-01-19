import React  from "react";
import {  Redirect } from 'react-router-dom';

const Auth = (props) => {

if (props.loggedInStatus == 'login') {
    return <Redirect to={'/'}/>
  } else {
    return props.children
  }

};
export default Auth;
