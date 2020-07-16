import { getAllVideos, addVideo } from "../../actions/videoActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoCard from "../cards/VideoCard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import noVideosPlaceholder from "./assets/no-videos.png";
import DashboardBreadcrumbs from "../dashboard/breadcrumbs/DashboardBreadcrumbs";
import AddButton from "../buttons/AddButton";
import AddVideoModal from "../modals/AddVideoModal";
import { toast } from "react-toastify";
import "./VideoGrid.css";

class VideoGrid extends Component {
  componentDidMount() {
    this.props.getAllVideos(this.props.match.params.topicName, this.props.match.params.subtopicName);
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
    } else if (prevProps.errors !== this.props.errors) {
      toast.info(this.props.errors.message);
    }
    this.props.getAllVideos(this.props.match.params.topicName, this.props.match.params.subtopicName);
  }

  submitVideo = (video) => {
    this.props.addVideo(video);
    this.handleAddVideo();
    this.props.getAllVideos(this.props.match.params.topicName, this.props.match.params.subtopicName);
  };

  render() {
    const { videos } = this.props.videos;
    if (videos.length > 0) {
      return (
        <div className = "video-grid-root">
          <DashboardBreadcrumbs
            pageType="video"
            topicName={this.props.match.params.topicName}
            subtopicName={this.props.match.params.subtopicName}
            topicId={this.props.location.state.topicId}
            subtopicId={this.props.location.state.subtopicId}
          />
          <Grid className="video-grid-container" container spacing={10}>
            {videos.map((video, index) => (
              <Grid className="video-card-grid-item" item xs key={video._id}>
                <Container>
                  <VideoCard
                    videoId={video._id}
                    subtopicId={video.subtopic_id}
                    topicId={this.props.location.state.topicId}
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
            <AddButton onClick={this.handleAddVideo} />
          </div>
          <AddVideoModal
            submitVideo={this.submitVideo}
            user={this.props.auth.user}
            topicName={this.props.match.params.topicName}
            subtopicName={this.props.match.params.subtopicName}
            subtopicId = {this.props.location.state.subtopicId}
            open={this.state.isOpened}
            metaExists={true}
            onClose={this.handleAddVideo}
          />
        </div>
      );
    } else {
      return (
        <div class="empty-page">
          <DashboardBreadcrumbs
            pageType="video"
            topicName={this.props.match.params.topicName}
            subtopicName={this.props.match.params.subtopicName}
          />
          <div className="no-videos-message">
            <img src={noVideosPlaceholder} alt="no-videos" />
            <h1>No Videos Under {this.props.match.params.subtopicName}</h1>
            <p>Be the first to add a video to this subtopic!</p>
            <div className="add-video-button">
              <AddButton onClick={this.handleAddVideo} />
            </div>
            <AddVideoModal
              submitVideo={this.submitVideo}
              user={this.props.auth.user}
              topicName={this.props.match.params.topicName}
              subtopicName={this.props.match.params.subtopicName}
              open={this.state.isOpened}
              metaExists={true}
              subtopicId={this.props.location.state.subtopicId}
              onClose={this.handleAddVideo}
            />
          </div>
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
  errors: PropTypes.object,
  video: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  videos: state.videos,
  video: state.video,
  errors: state.errors,
});
export default connect(mapStateToProps, { getAllVideos, addVideo })(VideoGrid);
