import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const styles = () => ({
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#609CE1",
    borderRadius: 10,
    marginBottom: 10,
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
  txt: {
    flex: 5,
  },
  doneBtn: {
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "green",
    },
  },
});

class TaskItem extends React.Component {
  render() {
    const { classes, text, index, onEdit } = this.props;
    return (
      <div className={classes.taskItem}>
        <div className={classes.txt}>
          <span onClick={onEdit}>
            {`${index + 1}. `}
            {text}
          </span>
        </div>
        <Checkbox
          checked={true}
          //   onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
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
        >
          Remove
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(TaskItem);
