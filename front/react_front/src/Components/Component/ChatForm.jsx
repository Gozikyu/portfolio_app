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
        process.env.REACT_APP_HOST +
          ":3001" +
          "/trainings/" +
          props.training.id +
          "/chats",
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
