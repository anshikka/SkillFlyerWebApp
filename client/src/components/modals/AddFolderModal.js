import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import "./AddFolderModal.css";
import { Container } from "@material-ui/core";

class AddFolderModal extends Component {
  state = {
    folderName: ""
  };

  onFolderInput = (e) => {
    const folderName = e.target.value;
    this.setState(()=> ({
        folderName: folderName
    }));
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const newFolder = {
      folder_name: this.state.folderName,
      user_id: this.props.user.id,
    };
    this.props.submitFolder(newFolder);
  };

  
  render() {
    return (
      <Modal
        className="add-folder-modal"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <Container className="add-folder-modal-root">
            <form className="add-folder-form" onSubmit={this.onSubmit}>
              
              <fieldset>
                <legend>Create a Name for Your Folder</legend>

                <label for="video-url">Folder Name:</label>
                <input
                  onInput = {(e) => this.onFolderInput(e)}
                  value={this.state.folderName}
                  type="text"
                  name="folderName"
                  title="Please enter a valid folder name."
                required></input>

              </fieldset>
              <Button
                className="submit-folder-button"
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Upload
              </Button>{" "}
            </form>
          </Container>
      </Modal>
    );
  }
}

AddFolderModal.propTypes = {
  user: PropTypes.object.isRequired
};

export default AddFolderModal;
