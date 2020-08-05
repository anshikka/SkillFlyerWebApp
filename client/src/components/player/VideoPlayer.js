import React, { Component } from "react";
import PropTypes from "prop-types";
import { getVideo, getAllVideos } from "../../actions/videoActions";
import { addVideoToFolder, getAllFolders } from "../../actions/folderActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import YouTube from "react-youtube";
import moment from 'moment';
import VideoCard from "../cards/VideoCard";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import Chip from "@material-ui/core/Chip";
import { Container } from "@material-ui/core";
import DashboardBreadcrumbs from "../dashboard/breadcrumbs/DashboardBreadcrumbs";
import UserChip from "../chips/UserChip";
import VoteBox from "../box/VoteBox";
import AddVideoToFolderModal from "../modals/AddVideoToFolderModal";
import "./VideoPlayer.css";

class VideoPlayer extends Component {
  /**
   * After successful render, send a request to server to get all videos, get the current video's details and get all the current user's folders.
   *
   * @name componentDidMount Wait
   */
  componentDidMount() {
    this.props.getAllVideos(
      this.props.match.params.topicName,
      this.props.match.params.subtopicName
    );
    this.props.getVideo(this.props.match.params.videoId);
    this.props.getAllFolders(this.props.auth.user.id);
  }

  /**
   * Don't start the video right after page is loaded.
   *
   * @name VideoPlayer Ready
   *
   * @param {object} [e] is the event target being tracked.
   */
  _onReady(e) {
    // access to player in all event handlers via e.target
    e.target.pauseVideo();
  }

  state = {
    isOpened: false,
  };

  /**
   * Submit video and folder data data from the form to the server.
   *
   * @name VideoPlayer Submit
   *
   * @param {object} [video] is the video ID and the video's folder ID.
   */
  handleAddVideoToFolder = (video) => {
    this.props.addVideoToFolder(video.video_id, video.folder_id);
    this.handleVideoAddedToFolder();
  };

  /**
   * Update modal state to open/closed.
   *
   * @name VideoPlayer Open/Close
   *
   * @param {object} [video] is the video ID and the video's folder ID.
   */
  handleVideoAddedToFolder = () => {
    this.setState((prevState) => ({ isOpened: !prevState.isOpened }));
  };

  /**
   * After any update to state, check for error messages and update accordingly.
   *
   * @name componentDidUpdate Wait
   */
  componentDidUpdate(prevProps) {
    if (prevProps.folders.status !== this.props.folders.status) {
      toast.info(this.props.folders.status.message);
    } else if (prevProps.errors !== this.props.errors) {
      toast.info(this.props.errors.message);
    }
  }

  /**
   * Renders a video player with ability to vote, check related videos, and view other metadata.
   *
   * @name VideoPlayer Render
   */
  render() {
    const { videos } = this.props.videos;
    const { video } = this.props.video;
    const { user } = this.props.auth;
    const { folders } = this.props.folders;
    const opts = {
      playerVars: {
        autoplay: 1,
      },
    };
    return (
      <div className="video-player-container">
        <DashboardBreadcrumbs
          pageType="video"
          topicName={video.topic_name}
          subtopicName={video.subtopic_name}
          subtopicId={video.subtopic_id}
        />
        <div>
          <Container className="player">
            <YouTube
              className="youtube-player"
              videoId={video.youtube_id}
              opts={opts}
              onReady={this._onReady}
            />
            <div className="video-information">
              <Chip
                variant="outlined"
                className="date-added"
                icon={<ScheduleIcon />}
                label={moment(video.date).format('LL')}
                size="medium"
              />
              <UserChip className="added-by" user_id={video.added_by} />
            </div>
          </Container>
          <Container className="side-video-player">
            <div className="meta">
              <Container className="video-information">
                <h2 className="title"> {video.title}</h2>
                <Chip
                  className="rank"
                  icon={<EmojiEventsIcon />}
                  label={"#1 in " + this.props.match.params.subtopicName}
                  size="medium"
                />
                <p> {video.description}</p>
                <VoteBox
                  votes={video.votes}
                  videoId={this.props.match.params.videoId}
                  userId={user.id}
                  topicName={this.props.match.params.topicName}
                  subtopicName={this.props.match.params.subtopicName}
                />
                <Chip
                  className="add-to-folder"
                  icon={<CreateNewFolderIcon />}
                  label={"Add to Folder"}
                  size="medium"
                  onClick={this.handleVideoAddedToFolder}
                />
                <AddVideoToFolderModal
                  submitVideoToFolder={this.handleAddVideoToFolder}
                  open={this.state.isOpened}
                  onClose={this.handleVideoAddedToFolder}
                  folders={folders}
                  videoId={video._id}
                />
              </Container>
              {
                <Container>
                  <h5 className="related-videos-title">Related Videos</h5>

                  <ul className="related-videos">
                    {videos.map((video, index) => (
                      <li>
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
                      </li>
                    ))}
                  </ul>
                </Container>
              }
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  videoId: PropTypes.string,
  topicName: PropTypes.string,
  subtopicName: PropTypes.string,
  added_by: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  rank: PropTypes.number,
  getAllVideos: PropTypes.func.isRequired,
  getVideo: PropTypes.func.isRequired,
  getAllFolders: PropTypes.func.isRequired,
  addVideoToFolder: PropTypes.func.isRequired,
  videos: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  folders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  videos: state.videos,
  video: state.video,
  folders: state.folders,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getAllVideos,
  getVideo,
  getAllFolders,
  addVideoToFolder,
})(VideoPlayer);
