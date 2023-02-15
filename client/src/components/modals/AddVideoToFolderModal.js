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

  /**
   * Update state with new folder ID that is selected.
   *
   * @name AddVideoToFolderModal Submit
   *
   * @param {object} [e] is the event target being tracked.
   */
  handleFolderChange = (e) => {
    const folderId = e.value;
    this.setState(() => ({
      folderId: folderId,
    }));
  };

  /**
   * Submit video and folder data data from the form to the server.
   *
   * @name AddVideoToFolderModal Submit
   *
   * @param {object} [e] is the event target being tracked.
   */
  handleAddVideoToFolder = (e) => {
    e.preventDefault();
    const videoToBeAdded = {
      video_id: this.props.videoId,
      folder_id: this.state.folderId,
    };
    this.props.submitVideoToFolder(videoToBeAdded);
  };

  /**
   * Iteratievely build a JSON that holds name and ID data for each folder for selection.
   *
   * @name AddVideoToFolderModal Extract
   */
  extractFolderIdsAndNames = () => {
    var folders = [];
    this.props.folders.forEach((folder) => {
      if (!folder.is_required)
        folders.push({ label: folder.folder_name, value: folder._id });
    });
    return folders;
  };

  /**
   * Renders the modal with a dropdown form to select a certain folder.
   *
   * @name AddVideoToFolderModal Render
   */
  render() {
    return (
      <Modal
        className="add-video-to-folder-modal"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <Container className="add-video-to-folder-modal-root">
          <Container className="form-body">
            <form
              className="add-video-form"
              onSubmit={this.handleAddVideoToFolder}
            >
              <fieldset>
                <legend>Choose Folder</legend>
                <label for="folder-name">Folder:</label>
                <Select
                  name="topicName"
                  id="topic-name-selector"
                  options={this.extractFolderIdsAndNames()}
                  onChange={(e) => this.handleFolderChange(e)}
                />
              </fieldset>
              <Button
                className="submit-video-button"
                type="submit"
                variant="contained"
                startIcon={<CreateNewFolderIcon />}
              >
                Add Video to Folder
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
  folders: PropTypes.array.isRequired,
};

export default AddVideoToFolderModal;
