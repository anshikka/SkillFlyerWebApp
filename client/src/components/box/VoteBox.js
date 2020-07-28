import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addToLikedVideos,
  addToDislikedVideos,
  removeFromDislikedVideos,
  removeFromLikedVideos,
  getUserLikedVideo,
  getUserDislikedVideo,
} from "../../actions/authActions";
import { getVideoVotes, upvote, downvote } from "../../actions/videoActions";
import {
  getAllFolders,
  addVideoToFolder,
  deleteVideoFromFolder,
} from "../../actions/folderActions";
import Box from "@material-ui/core/Box";
import VoteChip from "../chips/VoteChip";
import UpvoteButton from "../buttons/vote/UpvoteButton";
import DownvoteButton from "../buttons/vote/DownvoteButton";

class VoteBox extends Component {
  /**
   * Get video vote data and user interactions with video.
   *
   * @name componentDidMount Wait
   */
  componentDidMount() {
    this.props.getUserLikedVideo(this.props.userId, this.props.videoId);
    this.props.getUserDislikedVideo(this.props.userId, this.props.videoId);
    this.props.getVideoVotes(this.props.videoId);
    this.props.getAllFolders(this.props.userId);
  }

  /**
   * Like a video.
   * Checks conditions and likes a video as clicked.
   *
   * @name Video Like
   */
  like = () => {
    const { liked_video } = this.props.auth;
    const { disliked_video } = this.props.auth;
    const { folders } = this.props.folders;

    if (!liked_video && disliked_video) {
      // video is currently disliked
      this.props.removeFromDislikedVideos(
        this.props.userId,
        this.props.videoId
      );
      this.props.addToLikedVideos(this.props.userId, this.props.videoId);
      this.props.upvote(this.props.videoId);
      this.props.upvote(this.props.videoId);
      this.props.addVideoToFolder(this.props.videoId, folders[0]._id);
    } else if (liked_video && !disliked_video) {
      // video is already liked (unlike)
      this.props.removeFromLikedVideos(this.props.userId, this.props.videoId);
      this.props.downvote(this.props.videoId);
      this.props.deleteVideoFromFolder(this.props.videoId, folders[0]._id);
    } else {
      // video is not liked or disliked
      this.props.addToLikedVideos(this.props.userId, this.props.videoId);
      this.props.upvote(this.props.videoId);
      this.props.addVideoToFolder(this.props.videoId, folders[0]._id);
    }
  };

  /**
   * Dislike a video.
   * Checks conditions and dislikes a video as clicked.
   *
   * @name Video Dislike
   */
  dislike = () => {
    const { liked_video } = this.props.auth;
    const { disliked_video } = this.props.auth;
    const { folders } = this.props.folders;
    if (!disliked_video && liked_video) {
      // video is currently liked
      this.props.removeFromLikedVideos(this.props.userId, this.props.videoId);
      this.props.addToDislikedVideos(this.props.userId, this.props.videoId);
      this.props.downvote(this.props.videoId);
      this.props.downvote(this.props.videoId);
      this.props.deleteVideoFromFolder(this.props.videoId, folders[0]._id);
    } else if (disliked_video && !liked_video) {
      // video is currently disliked (undislike)
      this.props.removeFromDislikedVideos(
        this.props.userId,
        this.props.videoId
      );
      this.props.upvote(this.props.videoId);
    } else {
      // video is not liked or disliked
      this.props.addToDislikedVideos(this.props.userId, this.props.videoId);
      this.props.downvote(this.props.videoId);
    }
  };

  /**
   * Renders the box to like or dislike a video.
   *
   * @name VoteBox Render
   */
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
  videoId: PropTypes.string.isRequired,
  topicName: PropTypes.string.isRequired,
  subtopicName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  getUserLikedVideo: PropTypes.func.isRequired,
  getUserDislikedVideo: PropTypes.func.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  addToLikedVideos: PropTypes.func.isRequired,
  removeFromLikedVideos: PropTypes.func.isRequired,
  addToDislikedVideos: PropTypes.func.isRequired,
  removeFromDislikedVideos: PropTypes.func.isRequired,
  getVideoVotes: PropTypes.func.isRequired,
  addVideoToFolder: PropTypes.func.isRequired,
  deleteVideoFromFolder: PropTypes.func.isRequired,
  getAllFolders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  video: state.video,
  folders: state.folders,
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
  addVideoToFolder,
  deleteVideoFromFolder,
  getAllFolders,
})(VoteBox);
