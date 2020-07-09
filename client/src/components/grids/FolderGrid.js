import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  getAllFolders,
  addFolder,
  deleteFolder,
} from "../../actions/folderActions";
import FolderCard from "../cards/FolderCard";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "./FolderGrid.css";
import Container from "@material-ui/core/Container";
import AddButton from "../buttons/AddButton";
import AddFolderModal from "../modals/AddFolderModal";
import { toast } from "react-toastify";

class FolderGrid extends Component {
  componentDidMount() {
    this.props.getAllFolders({ user_id: this.props.auth.user.id });
  }
  state = {
    isOpened: false,
  };

  handleAddFolder = () => {
    this.setState((prevState) => ({ isOpened: !prevState.isOpened }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.folders.status !== this.props.folders.status) {
      toast.info(this.props.folders.status.message);
    } else if (prevProps.errors !== this.props.errors) {
      toast.info(this.props.errors.message);
      this.handleAddFolder();
    }
    this.props.getAllFolders({ user_id: this.props.auth.user.id });
  }

  submitFolder = (folder) => {
    this.props.addFolder(folder);
    this.handleAddFolder();
    this.props.getAllFolders({ user_id: this.props.auth.user.id });
  };

  deleteFolder = (folder) => {
    this.props.deleteFolder(folder);
    this.props.getAllFolders({ user_id: this.props.auth.user.id });
  };

  render() {
    const { folders } = this.props.folders;
    return (
      <div id="folder-grid-body">
        <Grid id="folder-grid-container" container spacing={10}>
          {folders.map((folder) => (
            <Grid className="folder-card-grid-item" key={folder._id} item xs>
              <Container className="folder-card-container">
                <Link
                  to={{
                    pathname: `/dashboard/folders/${folder.folder_name}`,
                    state: {folderName: folder.folder_name, folderId: folder._id},
                  }}
                >
                  <FolderCard
                    deleteFolder={this.deleteFolder}
                    user={this.props.auth.user}
                    folderId={folder._id}
                    name={folder.folder_name}
                    length={folder.videos.length}
                    isRequired={folder.is_required}
                  />
                </Link>
              </Container>
            </Grid>
          ))}
        </Grid>
        <div className="add-folder-button">
          <AddButton className="add-button" onClick={this.handleAddFolder} />
        </div>
        <AddFolderModal
          submitFolder={this.submitFolder}
          user={this.props.auth.user}
          open={this.state.isOpened}
          onClose={this.handleAddFolder}
        />
      </div>
    );
  }
}

FolderGrid.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllFolders: PropTypes.func.isRequired,
  addFolder: PropTypes.func.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  folders: PropTypes.object.isRequired,
  errors: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  folders: state.folders,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  getAllFolders,
  addFolder,
  deleteFolder,
})(FolderGrid);
