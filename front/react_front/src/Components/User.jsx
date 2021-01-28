import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PrimaryButton } from "./UIkit/index";

const User = (props) => {
  const userProfileurl = "http://localhost:3001/users/" + props.user.id;

  return (
    <div>
      <Link to={userProfileurl}>{props.user.name}</Link>
      {props.user.id}
      {props.currentUser.admin && (
        <PrimaryButton
          label={"ユーザーを削除する"}
          onClick={() =>
            axios
              .delete(userProfileurl, { withCredentials: true })
              .then((response) => {
                console.log("registration res", response);
                alert("指定したユーザーを削除しました");
              })
              .catch((error) => {
                console.log("registration error", error);
                alert(
                  "ユーザーを削除できませんでした。通信環境をご確認ください"
                );
              })
          }
        />
      )}
    </div>
  );
};
export default User;
