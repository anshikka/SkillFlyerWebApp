import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoCardComponent from "./VideoCardComponent";
import { toast } from "react-toastify";
import "./VideoCard.css";

class VideoCard extends Component {
  confirmCopied = () => {
    toast.info("Link copied to clipboard!");
  };
  render() {
    return (
      <VideoCardComponent
        bgPhoto={this.props.thumbnailUrl}
        rank={"#" + (this.props.rank + 1)}
        watchButton="&#xF144; Watch Now"
        videoUrl={window.location.href + "/" + this.props.videoId}
        title={this.props.title}
      />
    );
  }
}

VideoCard.propTypes = {
  videoId: PropTypes.string,
  topicName: PropTypes.string,
  subtopicName: PropTypes.string,
  addedBy: PropTypes.string,
  title: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  description: PropTypes.string,
  rank: PropTypes.number,
};

export default VideoCard;
