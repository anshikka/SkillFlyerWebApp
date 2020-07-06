import React, { Component } from "react";
import PropTypes from "prop-types";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import "./FolderCard.css";

class FolderCard extends Component {
  onDelete = (e) => {
    e.preventDefault();
    const deletedFolder = {
      folder_id: this.props.folderId,
      user_id: this.props.user.id,
      is_required: this.props.isRequired
    };
    this.props.deleteFolder(deletedFolder);
  };
  render() {
    if (this.props.isRequired) {
      return (
        <div>
          <div class="card">
            <div class="overlay"></div>
            <div class="content">
              <h4>{this.props.name}</h4>
              <h6>{this.props.length + " videos in " + this.props.name}</h6>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div class="card">
            <div class="overlay"></div>
            <div class="content">
              <h4>{this.props.name}</h4>
              <h6>{this.props.length + " videos in " + this.props.name}</h6>
            </div>
            <div class="delete" onClick={(e) => this.onDelete(e)}>
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
