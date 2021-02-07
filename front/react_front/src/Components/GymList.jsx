import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/styles";

const GymList = (props) => {
  const [gyms, setGyms] = useState([]),
    [currentUser, setCurrentUser] = useState(""),
    [page, setPage] = useState(1),
    [isLoaded, setIsLoaded] = useState(false);

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
  const totalPage = Math.ceil(gyms.length / perpage);

  const getGyms = () => {
    console.log("move useEffect");
    axios
      .get("http://localhost:3001/gyms", { withCredentials: true })
      .then((results) => {
        setGyms(results.data);
        setIsLoaded(true);
        console.log(results);
      })
      .catch((data) => {
        console.log(data);
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
    getGyms();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (!isLoaded) {
    return <p>読み込み中です</p>;
  } else {
    return (
      <>
        <div className="userList">
          {gyms.slice(firstNumber, finalNumber).map((gym) => {
            return <p key={gym.id}>{gym.name}</p>;
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

export default GymList;
