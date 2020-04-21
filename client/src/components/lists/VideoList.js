import { getAllVideos } from "../../actions/videoActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoItem from "../items/VideoItem";
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import "./VideoListCSS.css";

class VideoList extends Component {
  componentDidMount() {
    const topicName = this.props.match.params.topicName
    const subtopicName = this.props.match.params.subtopicName
    this.props.getAllVideos(topicName, subtopicName);
  }
  render() {
    const { videos } = this.props.videos;
    return (
      <div id="video-list-body">
            <List id="video-list-root">
            {videos.map((video, index) => (
                <ListItem>
                <h1>#{index+1}</h1><br/>

                <Link className="video-list-link" to= {`/dashboard/${this.props.match.params.topicName}/${this.props.match.params.subtopicName}/videos/${video._id}`} key={video._id}>
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
                </ListItem>

            ))}
            </List>
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
