import React, { Component } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import "./AddButton.css"


class AddButton extends Component {
  render() {
    return (
    <Fab aria-label="add" className = "add-button" onClick={this.props.onClick}>
        <AddIcon className="add-icon" />
      </Fab>
    )
  }
}

export default AddButton;
