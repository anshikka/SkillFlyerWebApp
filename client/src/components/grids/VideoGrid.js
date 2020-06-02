import { getAllVideos } from "../../actions/videoActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoCard from "../cards/VideoCard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import noVideosPlaceholder from "./assets/no-videos.png";
import "./VideoGrid.css";

class VideoGrid extends Component {
  componentDidMount() {
    const topicName = this.props.match.params.topicName;
    const subtopicName = this.props.match.params.subtopicName;
    this.props.getAllVideos(topicName, subtopicName);
  }
  render() {
    const { videos } = this.props.videos;
    if (videos.length > 0) {
      return (
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
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  videos: state.videos,
});
export default connect(mapStateToProps, { getAllVideos })(VideoGrid);
