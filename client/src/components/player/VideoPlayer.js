import React, { Component } from "react";
import PropTypes from "prop-types";
import { getVideo, getAllVideos } from "../../actions/videoActions";
import { addVideoToFolder, getAllFolders } from "../../actions/folderActions";
import { connect } from "react-redux";
import YouTube from "react-youtube";
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
import { toast } from "react-toastify";
import "./VideoPlayer.css";


class VideoPlayer extends Component {
  componentDidMount() {
    this.topicName = this.props.match.params.topicName;
    this.subtopicName = this.props.match.params.subtopicName;
    const videoId = this.props.match.params.videoId;
    this.props.getAllVideos(this.topicName, this.subtopicName);
    this.props.getVideo(this.topicName, this.subtopicName, videoId);
    this.props.getAllFolders({ user_id: this.props.auth.user.id });
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  state = {
    isOpened: false,
  };

  submitVideoToFolder = (video) => {
    this.props.addVideoToFolder(video);
    this.handleAddVideoToFolder();
  }

  handleAddVideoToFolder = () => {
    this.setState((prevState) => ({ isOpened: !prevState.isOpened }));
  };
  componentDidUpdate(prevProps) {
    if (prevProps.folders.status !== this.props.folders.status) {
      toast.info(this.props.folders.status.message);
    } else if (prevProps.errors !== this.props.errors) {
      toast.info(this.props.errors.message);
    }
  }

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
          topicName={this.topicName}
          subtopicName={this.subtopicName}
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
                label="11th October 2019"
                size="medium"
              />
              <UserChip user_id={video.added_by} />
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
                  onClick={this.handleAddVideoToFolder}
                />
                <AddVideoToFolderModal
                  submitVideoToFolder={this.submitVideoToFolder}
                  open={this.state.isOpened}
                  onClose={this.handleAddVideoToFolder}
                  folders={folders}
                  videoId = {video._id}
                />
              </Container>
              {
                <Container>
                  <h5>Related Videos</h5>
                  <hr />
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
