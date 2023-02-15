import { connect } from "react-redux";
import React, { Component } from "react";
import { searchVideo } from "../../../actions/videoActions";
import PropTypes from "prop-types";
import VideoCard from "../../cards/VideoCard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "../VideoGrid.css";

class VideoSearchGrid extends Component {
  /**
   * After successful render, send a request to server with a search query.
   *
   * @name componentDidMount Wait
   */
  componentDidMount() {
    this.props.searchVideo(this.props.query);
  }

  /**
   * Renders the search results for videos in a grid format.
   *
   * @name TopicSearchGrid Render
   */
  render() {
    const { videos } = this.props.videos;
    if (videos.length > 0) {
      // videos are found matching query
      return (
        <div className="video-grid-root">
          <h3 className="title">Videos:</h3>

          <Grid className="video-grid-container" container spacing={10}>
            {videos.map((video, index) => (
              <Grid className="video-card-grid-item" item xs key={video._id}>
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
        // no videos are found matching query
        <div class="empty-page">
          <div className="no-videos-message">
            <h3>No Videos that matched '{this.props.query}'.</h3>
          </div>
        </div>
      );
    }
  }
}

VideoSearchGrid.propTypes = {
  auth: PropTypes.object.isRequired,
  videos: PropTypes.object.isRequired,
  errors: PropTypes.object,
  video: PropTypes.object,
  query: PropTypes.string.isRequired,
  searchVideo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  videos: state.videos,
  video: state.video,
  errors: state.errors,
});

export default connect(mapStateToProps, { searchVideo })(VideoSearchGrid);
