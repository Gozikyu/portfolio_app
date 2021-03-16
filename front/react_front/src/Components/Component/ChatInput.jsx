import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
// import { isPropsValid } from "@fullcalendar/common";

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
  button: {
    //margin: theme.spacing(1),
  },
}));

const ChatInput = (props) => {
  const [chat, setChat] = useState("");
  const classes = useStyles();

  console.log(props.currentState);

  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="メッセージを入力"
          className={classes.wrapText}
          value={chat}
          onChange={(event) => setChat(event.target.value)}
          //margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            axios
              .post(
                "http://localhost:3001/chats",
                {
                  chat: {
                    content: chat,
                    training_id: 1,
                  },
                },
                { withCredentials: true }
              )
              .then((response) => {
                console.log("registration res", response);
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
