import React, { useState } from "react";
import axios from "axios";
import { PrimaryButton } from "./UIkit/index";

const GymDeleteButton = (props) => {
  const gymUrl = process.env.REACT_APP_HOST + ":3001" + "/gyms/" + props.gym.id;

  return (
    <div>
      <PrimaryButton
        label={"ジムを削除する"}
        onClick={() => {
          if (window.confirm("削除してよろしいですか？")) {
            console.log(gymUrl);
            axios
              .delete(gymUrl, { withCredentials: true })
              .then((response) => {
                console.log("registration res", response);
                props.setChangeState(true);
                alert("指定したジムを削除しました");
              })
              .catch((error) => {
                console.log("registration error", error);
                alert("ジムを削除できませんでした。通信環境をご確認ください");
              });
          }
        }}
      />
      {/* )} */}
    </div>
  );
};
export default GymDeleteButton;
