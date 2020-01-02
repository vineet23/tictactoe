import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from "@rmwc/dialog";
import "@material/dialog/dist/mdc.dialog.css";
import "@material/button/dist/mdc.button.css";

//props
//open - for open or close
//setaction - function to close the alert depending on the event action
//title - title of dialog
//content - content of dialog
//exit - to specify if used for exit or not

class Alert extends Component {
  render() {
    return (
      <Dialog
        preventOutsideDismiss
        open={this.props.open}
        onClose={evt => {
          console.log(evt.detail.action);
          var close = this.props.setaction;
          close(evt.detail.action);
        }}
      >
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>{this.props.content}</DialogContent>
        <DialogActions>
          {this.props.exit ? (
            <DialogButton action="close">Cancel</DialogButton>
          ) : (
            <div></div>
          )}
          <DialogButton action="ok">Yes</DialogButton>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Alert;
