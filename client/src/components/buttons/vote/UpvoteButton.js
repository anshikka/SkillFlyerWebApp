import React, { Component } from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PropTypes from "prop-types";
import "./VoteButton.css";

class UpvoteButton extends Component {
  /**
   * Renders the upvote button.
   * Selection changes on whether video is liked.
   *
   * @name Upvote Render
   */
  render() {
    if (this.props.liked) {
      // video is liked
      return (
        <KeyboardArrowUpIcon
          onClick={this.props.like.bind(this)}
          className="vote-button vote-selected"
        />
      );
    } else {
      // video is not liked
      return (
        <KeyboardArrowUpIcon
          onClick={this.props.like.bind(this)}
          className="vote-button"
        />
      );
    }
  }
}

UpvoteButton.propTypes = {
  like: PropTypes.func.isRequired,
  liked: PropTypes.bool.isRequired,
};

export default UpvoteButton;
