import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideoById } from "../../actions/videoActions"
import VideoCardComponent from "./VideoCardComponent";
import { toast } from "react-toastify";
import "./VideoCard.css";

class FolderVideoCard extends Component {
  componentDidMount() {
    this.props.getVideoById(this.props.videoId);
  }


  confirmCopied = () => {
    toast.info("Link copied to clipboard!");
  };
  render() {
    const { video } = this.props.video;
    return (
      <VideoCardComponent
        bgPhoto={video.thumbnail_url}
        watchButton="&#xF144; Watch Now"
        title={video.title}
      />
    );
  }
}

FolderVideoCard.propTypes = {
  videoId: PropTypes.string.isRequired,
  video: PropTypes.object.isRequired
  
};
const mapStateToProps = (state) => ({
    video: state.video,
});

export default connect(mapStateToProps, { getVideoById })(FolderVideoCard);
