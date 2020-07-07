import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import Select from "react-select";
import "./AddVideoToFolderModal.css";
import { Container } from "@material-ui/core";

class AddVideoToFolderModal extends Component {
  state = {
    folderId: "",
  };

  handleChange = (e) => {
    const folderId = e.value;
    this.setState(() => ({
      folderId: folderId,
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const videoToBeAdded = {
      video_id: this.props.videoId,
      folder_id: this.state.folderId,
    };
    this.props.submitVideoToFolder(videoToBeAdded);
  };

  extractFolderIdsAndNames = () => {
    var folders = [];
    this.props.folders.forEach((folder) => {
      if (!folder.is_required)
        folders.push({ label: folder.folder_name, value: folder._id });
    });
    return folders;
  };

  render() {
    return (
      <Modal
        className="add-video-to-folder-modal"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <Container className="add-video-to-folder-modal-root">
          <Container className="form-body">
            <form className="add-video-form" onSubmit={this.onSubmit}>
              <fieldset>
                <legend>Choose Folder</legend>

                <label for="folder-name">Folder:</label>
                <Select
                  name="topicName"
                  id="topic-name-selector"
                  options={this.extractFolderIdsAndNames()}
                  onChange={(e) => this.handleChange(e)}
                />
              </fieldset>
              <Button
                className="submit-video-button"
                type="submit"
                variant="contained"
                startIcon={<CreateNewFolderIcon />}
              >
                Upload
              </Button>{" "}
            </form>
          </Container>
        </Container>
      </Modal>
    );
  }
}

AddVideoToFolderModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  submitVideoToFolder: PropTypes.func.isRequired,
  folders: PropTypes.array.isRequired
};

export default AddVideoToFolderModal;
