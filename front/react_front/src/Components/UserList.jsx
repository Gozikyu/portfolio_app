import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import User from "./User";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
// import Pagination from "material-ui-flat-pagination";

const UserList = (props) => {
  const [users, setUsers] = useState([]),
    [currentUser, setCurrentUser] = useState(""),
    [page, setPage] = useState(1);

  const history = useHistory();

  const perpage = 10;
  const firstNumber = 0 + perpage * (page - 1);
  const finalNumber = firstNumber + 10;

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

  const handleChange = (event) => {
    console.log(event.target);
    setPage(event.target.innerHTML);
  };

  if (users == [] || users.logged_in == false) {
    return <p>読み込み中です</p>;
  } else {
    console.log(page);

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

          <Pagination
            // limit={10}
            // offset={10}
            value={3}
            total={100}
            onClick={(event) => handleChange(event)}
          />
        </div>
      </>
    );
  }
};

export default UserList;
