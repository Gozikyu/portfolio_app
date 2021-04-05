import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

const SelectFromComponent = (props) => {
  const classes = useStyles();
  const textStyle = props.fullWidth ? classes.full : classes.half;
  const [item, setItem] = React.useState("");

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <div>
      <FormControl className={textStyle} required={props.required}>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          onChange={props.onChange}
        >
          {Object.keys(props.items).map((key, i) => {
            return (
              <MenuItem key={i} value={props.items[key]}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectFromComponent;
