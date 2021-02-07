import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import User from "./User";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/styles";

const UserList = (props) => {
  const [users, setUsers] = useState([]),
    [currentUser, setCurrentUser] = useState(""),
    [page, setPage] = useState(1);

  const history = useHistory();

  const useStyles = makeStyles({
    pagination: {
      display: "inline-block",
      textAlign: "center",
    },
  });
  const classes = useStyles();

  const perpage = 10;
  const firstNumber = 0 + perpage * (page - 1);
  const finalNumber = firstNumber + perpage;
  const totalPage = Math.ceil(users.length / perpage);
  console.log(totalPage);

  const getUsers = () => {
    console.log("move useEffect");
    axios
      .get("http://localhost:3001/users", { withCredentials: true })
      .then((results) => {
        setUsers(results.data);
      })
      .catch((data) => {
        console.log(data);
        console.log(users);
      });
  };

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        console.log("registration res", response.data);
        setCurrentUser(response.data.user);
        if (response.data.logged_in) {
          return;
        } else {
          alert("ログインしてください");
          history.push("/signin");
        }
      });
  };

  useEffect(() => {
    checkLoginStatus();
    getUsers();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (users == [] || users.logged_in == false) {
    return <p>読み込み中です</p>;
  } else {
    console.log(page);
    console.log(firstNumber, finalNumber);

    return (
      <>
        <div className="userList">
          {users.slice(firstNumber, finalNumber).map((user) => {
            return (
              <User
                user={user}
                key={user.id}
                loggedInStatus={props.loggedInStatus}
                currentUser={currentUser}
              />
            );
          })}
        </div>
        <Pagination
          className={classes.pagination}
          count={totalPage}
          page={page}
          onChange={handleChange}
        />
      </>
    );
  }
};

export default UserList;
