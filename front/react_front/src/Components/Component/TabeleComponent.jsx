import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    display: "inline-block",
  },
  followers: {
    display: "inline-block",
    flex: "left",
    marginLeft: "1rem",
  },
  tableItem: {
    fontWeight: "bold",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable(props) {
  const [followers, setFollowers] = useState([]);
  const classes = useStyles();

  const dateFormat = (date) => {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    var trainingDate = year + "/" + month + "/" + day;
    return trainingDate;
  };

  // const getFollowers = () => {
  //   axios
  //     .get(
  //       "http://localhost:3001/trainings/" + props.training.id + "/followers",
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       setFollowers(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("registration error", error);
  //     });
  // };

  // useEffect(() => {
  //   getFollowers();
  // }, []);

  return followers ? (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell align="center" className={classes.tableItem}>
              メニュー
            </TableCell>
            <TableCell align="center">{props.training.menu}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className={classes.tableItem}>
              参加者{" "}
              {"(" +
                props.followers.length +
                "/" +
                props.training.limit_number +
                ")"}
            </TableCell>
            <TableCell align="center">
              {props.followers.map((follower) => {
                return <p className={classes.followers}>{follower.name}</p>;
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className={classes.tableItem}>
              日時
            </TableCell>
            <TableCell align="center">
              {dateFormat(props.training.created_at)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className={classes.tableItem}>
              場所
            </TableCell>
            <TableCell align="center">{props.training.location}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <></>
  );
}