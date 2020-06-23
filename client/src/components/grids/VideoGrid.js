import { getAllVideos, addVideo } from "../../actions/videoActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoCard from "../cards/VideoCard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import noVideosPlaceholder from "./assets/no-videos.png";
import DashboardBreadcrumbs from "../dashboard/breadcrumbs/DashboardBreadcrumbs";
import AddVideoButton from "../buttons/AddVideoButton";
import AddVideoModal from "../modals/AddVideoModal";
import { toast } from "react-toastify";
import "./VideoGrid.css";

class VideoGrid extends Component {
  componentDidMount() {
    this.topicName = this.props.match.params.topicName;
    this.subtopicName = this.props.match.params.subtopicName;
    this.props.getAllVideos(this.topicName, this.subtopicName);
  }
  state = {
    isOpened: false,
  };

  handleAddVideo = () => {
    this.setState((prevState) => ({ isOpened: !prevState.isOpened }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.video.status !== this.props.video.status) {
      toast.info(this.props.video.status.message);
      this.props.getAllVideos(this.topicName, this.subtopicName);
    }
  }

  submitVideo = (video) => {
    this.props.addVideo(video);
    this.handleAddVideo();
    this.props.getAllVideos(this.topicName, this.subtopicName);
  };

  render() {
    const { videos } = this.props.videos;
    if (videos.length > 0) {
      return (
        <div>
          <DashboardBreadcrumbs
            pageType="video"
            topicName={this.topicName}
            subtopicName={this.subtopicName}
          />
          <Grid id="video-grid-container" container spacing={10}>
            {videos.map((video, index) => (
              <Grid className="video-card-grid-item" item xs key={video._id}>
                <Container>
                  <VideoCard
                    videoId={video._id}
                    topicName={this.props.match.params.topicName}
                    subtopicName={this.props.match.params.subtopicName}
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
          <div className="add-video-button">
            <AddVideoButton onClick={this.handleAddVideo} />
          </div>
          <AddVideoModal
            submitVideo={this.submitVideo}
            user={this.props.auth.user}
            topicName={this.topicName}
            subtopicName={this.subtopicName}
            open={this.state.isOpened}
            metaExists={true}
            onClose={this.handleAddVideo}
          />
        </div>
      );
    } else {
      return (
        <div className="no-videos-message">
          <img src={noVideosPlaceholder} alt="no-videos" />
          <h1>No Videos Under {this.props.match.params.subtopicName}</h1>
          <p>Be the first to add a video to this subtopic!</p>
        </div>
      );
    }
  }
}

VideoGrid.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllVideos: PropTypes.func.isRequired,
  videos: PropTypes.object.isRequired,
  addVideo: PropTypes.func.isRequired,
  video: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  videos: state.videos,
  video: state.video,
});
export default connect(mapStateToProps, { getAllVideos, addVideo })(VideoGrid);
