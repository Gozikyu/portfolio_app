import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/styles";

const TrainingList = (props) => {
  const [trainings, setTrainings] = useState([]),
    [page, setPage] = useState(1),
    [url, setUrl] = useState(""),
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
  const totalPage = Math.ceil(trainings.length / perpage);

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        setUrl("http://localhost:3001/trainings/" + response.data.user.id);
        // const url = "http://localhost:3001/trainings/" + id;
        if (response.data.logged_in) {
          return;
        } else {
          alert("ログインしてください");
          history.push("/signin");
        }
      });
  };

  const getTraining = () => {
    console.log(url);
    axios
      .get(url, { withCredentials: true })
      .then((results) => {
        setTrainings(results.data);
        setIsLoaded(true);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    checkLoginStatus();
    getTraining();
  }, []);

  useEffect(() => {
    getTraining();
  }, [url]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (!isLoaded) {
    return <p>読み込み中です</p>;
  } else {
    return (
      <>
        <div className="userList">
          {trainings.slice(firstNumber, finalNumber).map((training) => {
            return (
              <p key={training.id}>
                {training.menu}
                {training.date}
              </p>
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

export default TrainingList;
