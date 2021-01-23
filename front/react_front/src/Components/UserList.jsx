import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import User from "./User";
import axios from "axios";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
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
        if (response.data.logged_in) {
          return;
        } else {
          alert("please login");
          history.push("/signin");
        }
      });
  };

  useEffect(() => {
    checkLoginStatus();
    getUsers();
  }, []);

  if (users == [] || users.logged_in == false) {
    console.log("render");
    console.log(users);
    console.log(users);
    return <p>読み込み中です</p>;
  } else {
    return (
      <div className="userList">
        {users.map((data) => {
          return (
            <User
              data={data}
              key={data.id}
              loggedInStatus={props.loggedInStatus}
            />
          );
        })}
      </div>
    );
  }
};

export default UserList;
