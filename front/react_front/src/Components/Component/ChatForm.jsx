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
          axios
            .post(
              "http://localhost:3001/chats",
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
          // event.preventDefault()
        }}
      />
    </>
  );
};

export default ChatForm;
