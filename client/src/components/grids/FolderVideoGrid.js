import { getFolderContent } from "../../actions/folderActions";
import { getVideo } from "../../actions/videoActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoCard from "../cards/VideoCard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import noVideosPlaceholder from "./assets/no-videos.png";
import "./VideoGrid.css";

class FolderVideoGrid extends Component {
  componentDidMount() {
    this.props.getFolderContent({
      folder_id: this.props.location.state.folderId,
    });
    
  }


  render() {
    const { videos } = this.props.folders;
    console.log(videos);
    if (videos.length > 0) {
      return (
        <div>
          <Grid id="video-grid-container" container spacing={10}>
            {videos.map((video, index) => (
              <Grid className="video-card-grid-item" item xs key={index}>
                <Container>
                <VideoCard
                    videoId={video._id}
                    subtopicId={video.subtopic_id}
                    topicName={video.topic_name}
                    subtopicName={video.subtopic_name}
                    title={video.title}
                    description={video.description}
                    thumbnailUrl={video.thumbnail_url}
                    addedBy={video.added_by}
                    rank={index}
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
  getFolderContent: PropTypes.func.isRequired,
  folders: PropTypes.object.isRequired,
  errors: PropTypes.object,
  video: PropTypes.object
};
const mapStateToProps = (state) => ({
  folders: state.folders,
  errors: state.errors,
  auth: state.auth,
  video: state.video
});
export default connect(mapStateToProps, { getFolderContent, getVideo })(FolderVideoGrid);
