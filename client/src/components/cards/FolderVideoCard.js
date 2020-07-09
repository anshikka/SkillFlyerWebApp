import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideo } from "../../actions/videoActions"
import VideoCardComponent from "./VideoCardComponent";
import { toast } from "react-toastify";
import "./VideoCard.css";

class FolderVideoCard extends Component {
  componentDidMount() {
    this.props.getVideo(this.props.videoId);
  }


  confirmCopied = () => {
    toast.info("Link copied to clipboard!");
  };
  render() {
    const { video } = this.props.video;
    return (
 
      <VideoCardComponent
        id={video._id}
        bgPhoto={video.thumbnail_url}
        watchButton="&#xF144; Watch Now"
        topicName={video.topic_name}
        subtopicName={video.subtopic_name}
        subtopicId={video.subtopic_id}
        videoId = {video._id}
        title={video.title}
        rank = "&#xF1F8;"
      />
    );
  }
}

FolderVideoCard.propTypes = {
  videoId: PropTypes.string.isRequired,
  video: PropTypes.object.isRequired
  
};
const mapStateToProps = (state, ownProps) => ({
    video: state.video,
});

export default connect(mapStateToProps, { getVideo })(FolderVideoCard);
