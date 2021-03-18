import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import ChatInput from "./ChatInput";
import { MessageLeft, MessageRight } from "./Messages";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80vw",
    height: "80vh",
    maxWidth: "500px",
    maxHeight: "700px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  paper2: {
    width: "80vw",
    maxWidth: "500px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  messagesBody: {
    width: "calc( 100% - 20px )",
    margin: 10,
    overflowY: "scroll",
    height: "calc( 100% - 80px )",
  },
}));

const ChatComponent = (props) => {
  const [trainingChats, setTrainingChats] = useState({}),
    [loginUser, setLoginUser] = useState(""),
    [isLoaded, setIsLoaded] = useState(false),
    [changeState, setChangeState] = useState(false);
  const classes = useStyles();

  const dateFormat = (date) => {
    // var year = date.getFullYear();
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    var time = date.slice(11, 16);
    var trainingDate = month + "/" + day + " " + time;
    return trainingDate;
  };

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          setLoginUser(response.data.user);
        } else {
        }
      })
      .catch((error) => {
        console.log("ログインステータスエラー", error);
      });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const getChats = () => {
    axios
      .get("http://localhost:3001/chats/", {
        withCredentials: true,
      })
      .then((chats) => {
        setTrainingChats(chats.data);
        setIsLoaded(true);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    getChats();
  }, [changeState]);

  const changingState = useCallback(
    (boolean) => {
      setChangeState(boolean);
    },
    [setChangeState]
  );

  const resetChat = useCallback(() => {
    setTrainingChats("");
  }, [setTrainingChats]);

  return isLoaded ? (
    <div className={classes.container}>
      <Paper className={classes.paper} zdepth={2}>
        <Paper id="style-1" className={classes.messagesBody}>
          {trainingChats.map((trainingChat, i) => {
            return trainingChat.user_id == loginUser.id ? (
              <MessageRight
                key={i}
                message={trainingChat.content}
                timestamp={dateFormat(trainingChat.created_at)}
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName="まさりぶ"
                avatarDisp={false}
              />
            ) : (
              <MessageLeft
                message={trainingChat.content}
                timestamp={dateFormat(trainingChat.created_at)}
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName="まさりぶ"
                avatarDisp={false}
              />
            );
          })}
        </Paper>
        <ChatInput
          changingState={changingState}
          currentState={changeState}
          resetChat={resetChat}
        />
      </Paper>
    </div>
  ) : (
    <></>
  );
};

export default ChatComponent;
