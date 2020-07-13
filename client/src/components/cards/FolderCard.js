import React, { Component } from "react";
import PropTypes from "prop-types";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import VideoCountChip from "../chips/VideoCountChip";
import "./FolderCard.css";

class FolderCard extends Component {
  onDelete = (e) => {
    e.preventDefault();
    const deletedFolder = {
      folder_id: this.props.folderId,
      user_id: this.props.user.id,
      is_required: this.props.isRequired,
    };
    this.props.deleteFolder(deletedFolder);
  };
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
            <div className="delete" onClick={(e) => this.onDelete(e)}>
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
  name: PropTypes.string,
  length: PropTypes.number,
  isRequired: PropTypes.bool,
  deleteFolder: PropTypes.func,
  user: PropTypes.object,
  folderId: PropTypes.string,
};
export default FolderCard;
