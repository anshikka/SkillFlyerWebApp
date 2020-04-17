import { getAllVideos } from "../../actions/videoActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoItem from "../items/VideoItem";
import { Item } from 'semantic-ui-react';
import { Link } from "react-router-dom";

class VideoList extends Component {
  componentDidMount() {
    const topicName = this.props.match.params.topicName
    const subtopicName = this.props.match.params.subtopicName
    this.props.getAllVideos(topicName, subtopicName);
  }
  render() {
    const { videos } = this.props.videos;
    console.log(videos)
    return (
      <div id="video-list-body">
        <Item.Group divided>
            {videos.map((video) => (
                <Link to= {`/dashboard/${this.props.match.params.topicName}/${this.props.match.params.subtopicName}/videos/${video._id}`} key={video._id}>
                    <VideoItem
                    videoId={video._id}
                    topicName={this.props.match.params.topicName}
                    subtopicName={this.props.match.params.subtopicName}
                    title={video.title}
                    description={video.description}
                    thumbnailUrl={video.thumbnail_url}
                    addedBy = {video.added_by}
                    />
                </Link>
            ))}
        </Item.Group>
      </div>
    );
  }
}

VideoList.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllVideos: PropTypes.func.isRequired,
  videos: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  videos: state.videos,
});
export default connect(mapStateToProps, { getAllVideos })(VideoList);
