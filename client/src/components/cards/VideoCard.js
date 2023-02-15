import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoCardComponent from "./VideoCardComponent";
import { toast } from "react-toastify";

class VideoCard extends Component {
  confirmCopied = () => {
    toast.info("Link copied to clipboard!");
  };

  render() {
    /**
     * Renders the Video Card with basic video information.
     *
     * @name VideoCard Render
     */
    return (
      <VideoCardComponent
        bgPhoto={this.props.thumbnailUrl}
        rank={"#" + (this.props.rank + 1)}
        watchButton="&#xF144; Watch Now"
        videoId={this.props.videoId}
        subtopicId={this.props.subtopicId}
        topicId={this.props.topicId}
        topicName={this.props.topicName}
        subtopicName={this.props.subtopicName}
        title={this.props.title}
      />
    );
  }
}

VideoCard.propTypes = {
  videoId: PropTypes.string.isRequired,
  subtopicId: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  topicName: PropTypes.string.isRequired,
  subtopicName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  rank: PropTypes.number,
};

export default VideoCard;
