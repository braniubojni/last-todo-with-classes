import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { green } from "@material-ui/core/colors";

const styles = () => ({
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#609CE1",
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 10,
    marginLeft: "5%",
    marginRight: "5%",
    width: "60%",
    "&:hover": {
      backgroundColor: "whitesmoke",
      transition: "all .4s escape",
      WebkitTransition: "all .4s ease",
      color: "black",
    },
  },
  ifComplited: {
    textDecoration: "line-through",
    color: "#666666",
  },
  ifComplitedTaskItem: {
    backgroundColor: "#cccccc",
    "&:hover": {
      backgroundColor: "#cccccc",
    },
  },
  txt: {
    flex: 5,
  },
});

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

class TaskItem extends React.Component {
  render() {
    const { classes, data, index, onEdit, onRemove, onCheckChange } =
      this.props;
    return (
      <div
        className={`${classes.taskItem} ${
          data.complited ? classes.ifComplitedTaskItem : ""
        }`}
      >
        <div
          className={`${classes.txt} ${
            data.complited ? classes.ifComplited : ""
          }`}
        >
          <span onClick={onEdit}>
            {`${index + 1}. `}
            {data.taskBody}
          </span>
        </div>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={data.complited}
              onClick={onCheckChange}
              name="checkedG"
            />
          }
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.editBtn}
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.removeBtn}
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(TaskItem);
