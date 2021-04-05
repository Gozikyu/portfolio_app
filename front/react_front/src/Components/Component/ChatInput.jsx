import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  wrapForm: {
    display: "flex",
    justifyContent: "center",
    width: "95%",
    margin: `${theme.spacing(0)} auto`,
  },
  wrapText: {
    width: "100%",
  },
}));

const ChatInput = (props) => {
  const [chat, setChat] = useState("");
  const classes = useStyles();

  useEffect(() => {
    const scrollArea = document.getElementById("style-1");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="メッセージを入力"
          className={classes.wrapText}
          value={chat}
          onChange={(event) => setChat(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            axios
              .post(
                "http://52.195.8.187:3001/chats",
                {
                  chat: {
                    content: chat,
                    training_id: props.training.id,
                    user_name: props.loginUser.name,
                  },
                },
                { withCredentials: true }
              )
              .then((response) => {
                console.log("registration res", response);
                // props.resetChat();
                props.changingState(!props.currentState);
              })
              .catch((error) => {
                console.log("registration error", error);
              });
          }}
        >
          <SendIcon />
        </Button>
      </form>
    </>
  );
};

export default ChatInput;
