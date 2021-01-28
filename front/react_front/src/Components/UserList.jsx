import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import User from "./User";
import axios from "axios";
import Pagination from "material-ui-flat-pagination";

const UserList = (props) => {
  const [users, setUsers] = useState([]),
    [currentUser, setCurrentUser] = useState("");

  const history = useHistory();

  const getUsers = () => {
    console.log("move useEffect");
    axios
      .get("http://localhost:3001/users", { withCredentials: true })
      .then((results) => {
        setUsers(results.data);
        console.log(users);
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

  if (users == [] || users.logged_in == false) {
    return <p>読み込み中です</p>;
  } else {
    console.log(currentUser);
    console.log(users);

    return (
      <>
        <div className="userList">
          {users.map((user) => {
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
      </>
    );
  }
};

export default UserList;
