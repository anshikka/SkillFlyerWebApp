import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserLikedVideo } from "../../../actions/authActions";
import { likeVideo } from "../../../actions/videoActions";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PropTypes from "prop-types";
import "./VoteButton.css";

class UpvoteButton extends Component {
  componentDidMount() {
    this.props.getUserLikedVideo(this.props.userId, this.props.videoId);
  }
  like = () => {
    this.props.likeVideo(this.props.topicName, this.props.subtopicName, this.props.userId, this.props.videoId);
  }
  render() {
    const { liked_video } = this.props.auth;
    if (liked_video.video_liked === "true") {
      return <KeyboardArrowUpIcon className="vote-button vote-selected" />;
    } else {
      return <KeyboardArrowUpIcon onClick={this.like.bind(this)} className="vote-button" />;
    }
  }
}
UpvoteButton.propTypes = {
  userId: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  topicName: PropTypes.string.isRequired,
  subtopicName: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  video: state.video
});

export default connect(mapStateToProps, { getUserLikedVideo, likeVideo })(UpvoteButton);
