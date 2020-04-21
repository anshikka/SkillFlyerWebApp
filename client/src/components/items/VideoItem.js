import React, { Component } from "react";
import PropTypes from "prop-types";

import ReactCardFlip from "react-card-flip";
import VideoItemFront from "./VideoItemFront";
import VideoItemBack from "./VideoItemBack";
import {ToastContainer, toast} from 'react-toastify';
import "./VideoItemCSS.css";

class VideoItem extends Component {

  state = {
    isFlipped: false,
  };
  handleLearnMore = () => {
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  confirmCopied = () => {
    toast.info("Link copied to clipboard!");
  }
  render() {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <VideoItemFront confirmCopied = {this.confirmCopied} flipFunction = {this.handleLearnMore} title={this.props.title} thumbnailUrl = {this.props.thumbnailUrl} topicName = {this.props.topicName} subtopicName = {this.props.subtopicName} videoId = {this.props.videoId} addedBy={this.props.addedBy}/>
        <VideoItemBack confirmCopied = {this.confirmCopied} flipFunction ={this.handleLearnMore} description={this.props.description} topicName = {this.props.topicName} subtopicName = {this.props.subtopicName} videoId = {this.props.videoId} />
      </ReactCardFlip>
      
    );
  }
}

VideoItem.propTypes = {
  videoId: PropTypes.string,
  topicName: PropTypes.string,
  subtopicName: PropTypes.string,
  addedBy: PropTypes.string,
  title: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  description: PropTypes.string,
};

export default VideoItem;
