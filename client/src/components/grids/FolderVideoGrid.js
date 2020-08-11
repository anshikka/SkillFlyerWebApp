import { getFolderVideos, getFolder } from "../../actions/folderActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import FolderVideoCard from "../cards/FolderVideoCard";
import noVideosPlaceholder from "./assets/no-videos.png";
import "./VideoGrid.css";

class FolderVideoGrid extends Component {
  /**
   * After successful render, send a request to server to get all videos of a folder along with folder details.
   *
   * @name componentDidMount Wait
   */
  componentDidMount() {
    console.log(this.props.location.state);
    this.props.getFolderVideos(this.props.location.state.folderId);
    this.props.getFolder(this.props.location.state.folderId);
  }

  /**
   * After any update to state, show a message if deleted or updated folder.
   *
   * @name componentDidMount Wait
   */
  componentDidUpdate = (prevProps) => {
    if (prevProps.folders.status !== this.props.folders.status) {
      toast.info(this.props.folders.status.message);
      this.reload();
    }
  };

  /**
   * Send a request to get all videos in a folder along with folder details.
   *
   * @name FolderVideoGrid Reload
   */
  reload = () => {
    this.props.getFolderVideos(this.props.location.state.folderId);
    this.props.getFolder(this.props.location.state.folderId);
  };

  /**
   * Renders the grid that shows videos in a folder.
   *
   * @name FolderVideoGrid Render
   */
  render() {
    const { videos } = this.props.folders;
    const { folder } = this.props.folders;
    if (videos.length > 0) {
      // videos exist in folder
      return (
        <div className="video-grid-root">
          <Grid className="video-grid-container" container spacing={10}>
            {videos.map((video, index) => (
              <Grid className="video-card-grid-item" item xs key={index}>
                <Container>
                  <FolderVideoCard
                    videoId={video._id}
                    subtopicId={video.subtopic_id}
                    topicName={video.topic_name}
                    subtopicName={video.subtopic_name}
                    title={video.title}
                    description={video.description}
                    thumbnailUrl={video.thumbnail_url}
                    addedBy={video.added_by}
                    isRequired={folder.is_required}
                    folderId={folder._id}
                    reload={this.reload}
                  />
                </Container>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    } else {
      return (
        // videos don't exist in folder
        <div class="empty-page">
          <div className="no-videos-message">
            <img src={noVideosPlaceholder} alt="no-videos" />
            <h1>No Videos Under '{this.props.location.state.folderName}'</h1>
            <p>
              Add your first video by clicking 'Add to Folder' on the player.
            </p>
          </div>
        </div>
      );
    }
  }
}

FolderVideoGrid.propTypes = {
  getFolderVideos: PropTypes.func.isRequired,
  folders: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  folders: state.folders,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { getFolderVideos, getFolder })(
  FolderVideoGrid
);
