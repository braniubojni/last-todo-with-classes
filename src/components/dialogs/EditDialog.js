import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class EditDialog extends React.Component {
  state = {
    value: this.props.data?.taskBody || "",
  };
  handleTxtChange = (evn) => {
    this.setState({
      value: evn.target.value,
    });
  };
  onEnterAdd = (evn) => {
    if (evn.code === "Enter") this.props.handleSave(this.state.value);
  };
  render() {
    const { data, handleClose, handleSave } = this.props;
    return (
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit task {data.taskBody}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            value={this.state.value}
            onChange={this.handleTxtChange}
            onKeyDown={this.onEnterAdd}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSave(this.state.value)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditDialog;
