import { getFolderVideos, getFolder } from "../../actions/folderActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import FolderVideoCard from "../cards/FolderVideoCard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import noVideosPlaceholder from "./assets/no-videos.png";
import "./VideoGrid.css";
import { toast } from "react-toastify";

class FolderVideoGrid extends Component {
  componentDidMount() {
    this.props.getFolderVideos({
      folder_id: this.props.location.state.folderId,
    });
    this.props.getFolder({
      folder_id: this.props.location.state.folderId
    });
    
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.folders.status != this.props.folders.status){
      toast.info(this.props.folders.status.message);
      this.reload();
    }
  }

  reload = () => {
    this.props.getFolderVideos({
      folder_id: this.props.location.state.folderId,
    });
    this.props.getFolder({
      folder_id: this.props.location.state.folderId
    });
  }


  render() {
    const { videos } = this.props.folders;
    const { folder } = this.props.folders;
    
    if (videos.length > 0) {
      return (
        <div className = "video-grid-root">
          <Grid className ="video-grid-container" container spacing={10}>
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
                    required={folder.is_required}
                    folderId = {folder._id}
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
export default connect(mapStateToProps, { getFolderVideos, getFolder })(FolderVideoGrid);
