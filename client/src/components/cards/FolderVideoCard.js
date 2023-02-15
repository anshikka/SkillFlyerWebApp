import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteVideoFromFolder } from "../../actions/folderActions";
import VideoCardComponent from "./VideoCardComponent";
import DeletableFolderVideoCardComponent from "./DeletableFolderVideoCardComponent";

class FolderVideoCard extends Component {
  /**
   * Send a request to the server to remove a video from a specific folder.
   *
   * @name FolderVideoCard Remove
   *
   * @param {String} [videoId] is the ID of the specific video needing to be removed.
   */
  remove = (videoId, folderId) => {
    this.props.deleteVideoFromFolder(videoId, folderId);
    this.props.reload();
  };

  /**
   * Renders the Folder Video Card with basic video information within a folder.
   * Deletablity depends on whether the folder is required.
   *
   * @name FolderVideoCard Render
   */
  render() {
    if (!this.props.isRequired) {
      // folder is required: cannot delete videos from here
      return (
        <DeletableFolderVideoCardComponent
          bgPhoto={this.props.thumbnailUrl}
          watchButton="&#xF144; Watch Now"
          topicName={this.props.topicName}
          subtopicName={this.props.subtopicName}
          subtopicId={this.props.subtopicId}
          folderId={this.props.folderId}
          videoId={this.props.videoId}
          title={this.props.title}
          remove={this.remove}
          rank={true}
        />
      );
    } else {
      // folder is not required: videos are deletable
      return (
        <VideoCardComponent
          bgPhoto={this.props.thumbnailUrl}
          rank={"Liked"}
          watchButton="&#xF144; Watch Now"
          videoId={this.props.videoId}
          subtopicId={this.props.subtopicId}
          topicName={this.props.topicName}
          subtopicName={this.props.subtopicName}
          title={this.props.title}
        />
      );
    }
  }
}

FolderVideoCard.propTypes = {
  videoId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  deleteVideoFromFolder,
})(FolderVideoCard);
