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
import { getVideoVotes, upvote, downvote } from "../../actions/videoActions";
import { getAllFolders, addVideoToFolder, deleteVideoFromFolder } from "../../actions/folderActions";

class VoteBox extends Component {
  componentDidMount() {
    this.props.getUserLikedVideo(this.props.userId, this.props.videoId);
    this.props.getUserDislikedVideo(this.props.userId, this.props.videoId);
    this.props.getVideoVotes(
      this.props.topicName,
      this.props.subtopicName,
      this.props.videoId
    );
    this.props.getAllFolders({user_id: this.props.userId});
  }
  like = () => {
    const { liked_video } = this.props.auth;
    const { disliked_video } = this.props.auth;
    const { folders } = this.props.folders;
    if (!liked_video && disliked_video) {
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
      this.props.addVideoToFolder({video_id: this.props.videoId, folder_id: folders[0]._id});
    } else if (liked_video && !disliked_video) {
      this.props.removeFromLikedVideos(this.props.userId, this.props.videoId);
      this.props.downvote(
        this.props.topicName,
        this.props.subtopicName,
        this.props.videoId
      );
      this.props.deleteVideoFromFolder({video_id: this.props.videoId, folder_id: folders[0]._id});
    } else {
      this.props.addToLikedVideos(this.props.userId, this.props.videoId);
      this.props.upvote(
        this.props.topicName,
        this.props.subtopicName,
        this.props.videoId
      );
      this.props.addVideoToFolder({video_id: this.props.videoId, folder_id: folders[0]._id});

    }


  };

  dislike = () => {
    const { liked_video } = this.props.auth;
    const { disliked_video } = this.props.auth;
    const { folders } = this.props.folders;
    if (!disliked_video && liked_video) {
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
      this.props.deleteVideoFromFolder({video_id: this.props.videoId, folder_id: folders[0]._id});

    } else if (disliked_video && !liked_video) {
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
  folders: state.folders
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
  getAllFolders
})(VoteBox);
