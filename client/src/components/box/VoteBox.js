import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import VoteChip from "../chips/VoteChip";
import UpvoteButton from "../buttons/vote/UpvoteButton";
import DownvoteButton from "../buttons/vote/DownvoteButton";
import {
  addToLikedVideos,
  addToDislikedVideos,
  removeFromDislikedVideos,
  removeFromLikedVideos,
  getUserLikedVideo,
  getUserDislikedVideo,
} from "../../actions/authActions";
import { getVideoVotes } from "../../actions/videoActions";

import { upvote, downvote } from "../../actions/videoActions";

class VoteBox extends Component {
  componentDidMount() {
    this.props.getUserLikedVideo(this.props.userId, this.props.videoId);
    this.props.getUserDislikedVideo(this.props.userId, this.props.videoId);
    this.props.getVideoVotes(
      this.props.topicName,
      this.props.subtopicName,
      this.props.videoId
    );
  }
  like = () => {
    const { liked_video } = this.props.auth;
    const { disliked_video } = this.props.auth;
    if (!liked_video && disliked_video) {
        console.log("Undoing downvote and upvoting")
      this.props.removeFromDislikedVideos(
        this.props.userId,
        this.props.videoId
      );
      this.props.addToLikedVideos(this.props.userId, this.props.videoId);
      this.props.upvote(
        this.props.topicName,
        this.props.subtopicName,
        this.props.videoId
      );
      this.props.upvote(
        this.props.topicName,
        this.props.subtopicName,
        this.props.videoId
      );
    } else if (liked_video && !disliked_video) {
      console.log("undoing upvote");
      this.props.removeFromLikedVideos(this.props.userId, this.props.videoId);
      this.props.downvote(
        this.props.topicName,
        this.props.subtopicName,
        this.props.videoId
      );
    } else {
      console.log("Upvoting");
      this.props.addToLikedVideos(this.props.userId, this.props.videoId);
      this.props.upvote(
        this.props.topicName,
        this.props.subtopicName,
        this.props.videoId
      );
    }
    console.log(this.props.auth.disliked_video);


  };

  dislike = () => {
    const { liked_video } = this.props.auth;
    const { disliked_video } = this.props.auth;
    if (!disliked_video && liked_video) {
      console.log("Removing upvote and downvoting");
      this.props.removeFromLikedVideos(this.props.userId, this.props.videoId);
      this.props.addToDislikedVideos(this.props.userId, this.props.videoId);
      this.props.downvote(
        this.props.topicName,
        this.props.subtopicName,
        this.props.videoId
      );
      this.props.downvote(
        this.props.topicName,
        this.props.subtopicName,
        this.props.videoId
      );
    } else if (disliked_video && !liked_video) {
      console.log("undo downvote");
      this.props.removeFromDislikedVideos(
        this.props.userId,
        this.props.videoId
      );
      this.props.upvote(
        this.props.topicName,
        this.props.subtopicName,
        this.props.videoId
      );
    } else {
        console.log("downvoting");
      this.props.addToDislikedVideos(this.props.userId, this.props.videoId);
      this.props.downvote(
        this.props.topicName,
        this.props.subtopicName,
        this.props.videoId
      );
    }
 
  };

  render() {
    const { liked_video } = this.props.auth;
    const { disliked_video } = this.props.auth;
    const { votes } = this.props.video;
    return (
      <Box className="vote-box" component="span" m={1}>
        <UpvoteButton like={this.like} liked={liked_video} />
        <VoteChip votes={votes} />
        <DownvoteButton dislike={this.dislike} disliked={disliked_video} />
      </Box>
    );
  }
}

VoteBox.propTypes = {
  videoId: PropTypes.string,
  topicName: PropTypes.string,
  subtopicName: PropTypes.string,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  video: state.video,
});

export default connect(mapStateToProps, {
  getUserLikedVideo,
  getUserDislikedVideo,
  upvote,
  downvote,
  addToLikedVideos,
  removeFromLikedVideos,
  addToDislikedVideos,
  removeFromDislikedVideos,
  getVideoVotes,
})(VoteBox);
