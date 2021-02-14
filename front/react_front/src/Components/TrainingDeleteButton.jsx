import React, { useState } from "react";
import axios from "axios";
import { PrimaryButton } from "./UIkit/index";

const TrainingDeleteButton = (props) => {
  const trainingUrl = "http://localhost:3001/trainings/" + props.training.id;

  return (
    <div>
      <PrimaryButton
        label={"トレーニングを削除する"}
        onClick={() => {
          if (window.confirm("削除してよろしいですか？")) {
            console.log(trainingUrl);
            axios
              .delete(trainingUrl, { withCredentials: true })
              .then((response) => {
                console.log("registration res", response);
                props.setChangedTraining(true);
                alert("指定したトレーニングを削除しました");
              })
              .catch((error) => {
                console.log("registration error", error);
                alert(
                  "トレーニングを削除できませんでした。通信環境をご確認ください"
                );
              });
          }
        }}
      />
      {/* )} */}
    </div>
  );
};
export default TrainingDeleteButton;
