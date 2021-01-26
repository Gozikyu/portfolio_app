import React from "react";
import { Link } from "react-router-dom";

const User = (props) => {
  console.log(props.data);
  const userProfilepage = "users/" + props.data.id;

  return (
    <div>
      <Link to={userProfilepage}>{props.data.name}</Link>
    </div>
  );
};
export default User;
