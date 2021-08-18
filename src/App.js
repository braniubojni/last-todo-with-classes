import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import TaskItem from "./components/TaskItem";
import { v4 as uuidv4 } from "uuid";
import EditDialog from "./components/dialogs/EditDialog";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
    marginTop: "8%",
    marginLeft: "10%",
    marginRight: "10%",
    justifyContent: "center",
    backgroundColor: "#E1ECF9",
    borderRadius: 10,
    alignItems: "center",
    color: "white",
  },
  txtWithBtn: {
    margin: "3%",
  },
  txt: {
    marginRight: 10,
    width: 545,
  },
  btn: {
    marginLeft: 10,
    padding: 15,
  },
  taskItem: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  complitedTasks: {
    backgroundColor: "darkblue",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    borderRadius: 10,
    textAlign: "center",
  },
});

class App extends React.Component {
  state = {
    inputTask: "",
    taskList: [],
    editedItem: null,
  };
  handleTaskChange = (e) => {
    this.setState({
      inputTask: e.target.value,
    });
  };
  onAdd = () => {
    const { inputTask, taskList } = this.state;
    if (inputTask.trim()) {
      const taskItem = {
        id: uuidv4(),
        taskBody: inputTask.trim(),
        complited: false,
      };
      this.setState({
        taskList: [...taskList, taskItem],
        inputTask: "",
      });
    }
  };
  onEnterAddTask = (evn) => {
    if (evn.key === "Enter") {
      this.onAdd();
    }
  };
  onEdit = (editedTask) => {
    const editedItem = this.state.taskList.find(
      (item) => editedTask.id === item.id
    );
    this.setState({
      editedItem,
    });
  };
  onCheckChange = (id) => {
    const updatedTaskList = this.state.taskList.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          complited: !item.complited,
        };
      }
      return item;
    });
    this.setState({
      taskList: updatedTaskList,
    });
  };
  onRemove = (removedTask) => {
    const updatedTaskList = this.state.taskList.filter(
      (item) => item.id !== removedTask.id
    );
    this.setState({
      taskList: updatedTaskList,
    });
  };
  onClosedDialog = () => {
    this.setState({
      editedItem: null,
    });
  };
  handleSave = (newName) => {
    const { editedItem, taskList } = this.state;
    const updatedTaskList = taskList.map((item) => {
      if (item.id === editedItem.id) {
        return {
          ...item,
          taskBody: newName,
        };
      }
      return item;
    });
    this.setState({
      taskList: updatedTaskList,
      editedItem: null,
    });
  };
  renderListItems = () => {
    const { taskList } = this.state;
    return taskList.map((eachTask, index) => (
      <TaskItem
        key={eachTask.id}
        data={eachTask}
        index={index}
        onCheckChange={() => this.onCheckChange(eachTask.id)}
        onEdit={() => this.onEdit(eachTask)}
        onRemove={() => this.onRemove(eachTask)}
      />
    ));
  };
  complitedTasks = () => {
    return this.state.taskList.reduce((reducer, item) => {
      if (item.complited) {
        return (reducer += 1);
      }
    }, 0);
  };
  render() {
    const { classes } = this.props;
    const { inputTask, editedItem } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.txtWithBtn}>
          <TextField
            className={classes.txt}
            label="Type your tasks"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
            value={inputTask}
            onChange={this.handleTaskChange}
            autoFocus={true}
            inputProps={{
              onKeyDown: this.onEnterAddTask,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={this.onAdd}
          >
            Add a new task
          </Button>
        </div>
        {this.renderListItems()}
        {!!editedItem && (
          <EditDialog
            data={editedItem}
            handleClose={this.onClosedDialog}
            handleSave={this.handleSave}
          />
        )}
        <div className={classes.complitedTasks}>
          {this.complitedTasks()} Tasks complited
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
