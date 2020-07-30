import React, { Component } from "react";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "./VoteButton.css";

class DownvoteButton extends Component {
  /**
   * Renders the downvote button.
   * Selection changes on whether the video is disliked.
   *
   * @name Downvote Render
   */
  render() {
    if (this.props.disliked) {
      // video already disliked
      return (
        <KeyboardArrowDownIcon
          onClick={this.props.dislike.bind(this)}
          className="vote-button vote-selected"
        />
      );
    } else {
      // video not disliked
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
