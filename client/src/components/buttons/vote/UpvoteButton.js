import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserLikedVideo } from "../../../actions/authActions";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PropTypes from "prop-types";
import "./VoteButton.css";

class UpvoteButton extends Component {
  componentDidMount() {
    this.props.getUserLikedVideo(this.props.userId, this.props.videoId);
  }
  render() {
    const { liked_video } = this.props.auth;
    if (liked_video.video_liked === "true") {
      return <KeyboardArrowUpIcon className="vote-button upvote-selected" />;
    } else {
      return <KeyboardArrowUpIcon className="vote-button" />;
    }
  }
}
UpvoteButton.propTypes = {
  userId: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserLikedVideo })(UpvoteButton);
