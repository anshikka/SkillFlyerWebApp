import React, { Component } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import "./VideoCountChip.css";

class VideoCountChip extends Component {
  render() {
    return (
      <Chip
        className="video-count"
        icon = {<VideoLibraryIcon className="video-library-icon" />}
        label={this.props.length}
        size="medium"
      />
    );
  }
}

VideoCountChip.propTypes = {
  length: PropTypes.number.isRequired,
};
export default VideoCountChip;
