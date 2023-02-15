import React, { Component } from "react";
import PropTypes from "prop-types";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import VideoCountChip from "../chips/VideoCountChip";
import "./FolderCard.css";

class FolderCard extends Component {
  /**
   * Send a request to delete a specific folder.
   *
   * @name FolderCard Delete
   *
   * @param {object} [e] is the event target being tracked.
   */
  deleteFolder = (e) => {
    e.preventDefault();
    const deletedFolder = {
      folder_id: this.props.folderId,
      is_required: this.props.isRequired,
    };
    this.props.deleteFolder(deletedFolder);
  };

  /**
   * Renders a folder card with basic folder information.
   *
   * @name FolderCard Render
   */
  render() {
    if (this.props.isRequired) {
      return (
        <div className="folder-card-root">
          <div className="folder-card">
            <div className="overlay"></div>
            <div className="content">
              <h4>{this.props.name}</h4>
            </div>
            <div class="video-count">
              <VideoCountChip length={this.props.length} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="folder-card-root">
          <div className="folder-card">
            <div className="overlay"></div>
            <div className="content">
              <h4>{this.props.name}</h4>
            </div>
            <div className="video-count">
              <VideoCountChip length={this.props.length} />
            </div>
            <div className="delete" onClick={(e) => this.deleteFolder(e)}>
              <i>
                <DeleteOutlineIcon />
              </i>
            </div>
          </div>
        </div>
      );
    }
  }
}

FolderCard.propTypes = {
  name: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  isRequired: PropTypes.bool.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  folderId: PropTypes.string.isRequired,
};

export default FolderCard;
