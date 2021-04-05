import React, { useState, useCallback, useRef } from "react";
import { TextInput, PrimaryButton } from "../UIkit/index";
import axios from "axios";

const ChatForm = (props) => {
  const [chat, setChat] = useState("");

  const inputChat = useCallback(
    (event) => {
      setChat(event.target.value);
    },
    [setChat]
  );

  const postChat = () => {
    axios
      .post(
<<<<<<< HEAD
        "http://52.195.8.187:3001/chats",
=======
        process.env.REACT_APP_HOST + "/chats",
>>>>>>> 48a5881d3d94ffa875f585ccb27da2e9b8d81c44
        {
          chat: {
            content: chat,
            training_id: props.training.id,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("registration res", response);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  return (
    <>
      <TextInput
        fullWidth={true}
        label={"チャット"}
        multiline={true}
        rows={1}
        required={true}
        value={chat}
        type={"text"}
        onChange={inputChat}
      />

      <PrimaryButton
        label={"送信"}
        onClick={() => {
          postChat();
        }}
      />
    </>
  );
};

export default ChatForm;
