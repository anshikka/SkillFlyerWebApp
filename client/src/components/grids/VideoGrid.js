import { getAllVideos } from "../../actions/videoActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoCard from "../cards/VideoCard";
import Grid from "@material-ui/core/Grid";

import "./VideoGrid.css";

class VideoGrid extends Component {
  componentDidMount() {
    const topicName = this.props.match.params.topicName;
    const subtopicName = this.props.match.params.subtopicName;
    this.props.getAllVideos(topicName, subtopicName);
  }
  render() {
    const { videos } = this.props.videos;
    return (
      <Grid id="video-grid-container" container spacing={10}>
        {videos.map((video, index) => (
          <Grid className="video-card-grid-item" item xs key={video._id}>
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
          </Grid>
        ))}
      </Grid>
    );
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
