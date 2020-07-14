import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteVideoFromFolder,
} from "../../actions/folderActions";
import VideoCardComponent from "./VideoCardComponent";
import { toast } from "react-toastify";
import DeletableFolderVideoCardComponent from "./DeletableFolderVideoCardComponent";

class FolderVideoCard extends Component {
  confirmCopied = () => {
    toast.info("Link copied to clipboard!");
  };
  remove = (videoId) => {
    this.props.deleteVideoFromFolder({
      video_id: videoId,
      folder_id: this.props.folderId,
    });
    this.props.reload();
  };
  render() {
    if (!this.props.required) {
      return (
        <DeletableFolderVideoCardComponent
          bgPhoto={this.props.thumbnailUrl}
          watchButton="&#xF144; Watch Now"
          topicName={this.props.topicName}
          subtopicName={this.props.subtopicName}
          subtopicId={this.props.subtopicId}
          videoId={this.props.videoId}
          title={this.props.title}
          remove={this.remove}
          rank={true}
        />
      );
    } else {
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
  video: PropTypes.object.isRequired,
  folders: PropTypes.object.isRequired,
};
const mapStateToProps = (state, ownProps) => ({
  video: state.video,
  folders: state.folders,
});

export default connect(mapStateToProps, {
  deleteVideoFromFolder,
})(FolderVideoCard);
