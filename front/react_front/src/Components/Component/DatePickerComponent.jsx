import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  full: {
    marginBottom: 16,
    width: "100%",
  },
  half: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
    minWidth: 130,
    width: "calc(50% - 16px)",
  },
});

const DatePickerComponent = (props) => {
  const classes = useStyles();
  const textStyle = props.fullWidth ? classes.full : classes.half;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={textStyle}
        margin="normal"
        id="date-picker-dialog"
        label={props.label}
        required={props.required}
        format="yyyy/MM/dd"
        value={props.date}
        onChange={props.inputDate}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerComponent;
