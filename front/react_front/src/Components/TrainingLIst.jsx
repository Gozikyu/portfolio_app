import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/styles";
import TrainingDeleteButton from "./TrainingDeleteButton";

const TrainingList = (props) => {
  const [trainings, setTrainings] = useState([]),
    [page, setPage] = useState(1),
    [url, setUrl] = useState(""),
    // [changedTraining, setChangedTraining] = useState(false),
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
      .get("http://3.112.0.252:3001/login", { withCredentials: true })
      .then((response) => {
        setUrl("http://3.112.0.252:3001/trainings/" + response.data.user.id);
        if (response.data.logged_in) {
          return;
        } else {
          alert("ログインしてください");
          history.push("/signin");
        }
      });
  };

  const getTraining = () => {
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
  }, [url, props.changedTraining]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (!isLoaded) {
    return <p>読み込み中です</p>;
  } else {
    return (
      <>
        <div className="userList">
          {trainings.slice(firstNumber, finalNumber).map((training, i) => {
            return (
              <li key={i}>
                <p>
                  {training.menu}
                  {training.date}
                </p>
                <TrainingDeleteButton
                  training={training}
                  setChangedTraining={props.setChangedTraining}
                />
              </li>
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
