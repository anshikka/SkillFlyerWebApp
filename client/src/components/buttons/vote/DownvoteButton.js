import React, { Component } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PropTypes from "prop-types";
import "./VoteButton.css";

class DownvoteButton extends Component {
  render() {
    if (this.props.disliked) {
      return (
        <KeyboardArrowDownIcon
          onClick={this.props.dislike.bind(this)}
          className="vote-button vote-selected"
        />
      );
    } else {
      return (
        <KeyboardArrowDownIcon
          onClick={this.props.dislike.bind(this)}
          className="vote-button"
        />
      );
    }
  }
}
DownvoteButton.propTypes = {
  dislike: PropTypes.func.isRequired,
  disliked: PropTypes.bool.isRequired,
};

export default DownvoteButton;
