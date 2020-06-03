import React, { Component } from "react";
import PropTypes from "prop-types";
import { getVideo, getAllVideos } from "../../actions/videoActions";
import { connect } from "react-redux";
import YouTube from "react-youtube";
import VideoCard from "../cards/VideoCard";
import StarIcon from "@material-ui/icons/Star";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import ScheduleIcon from "@material-ui/icons/Schedule";
import UpvoteButton from "../buttons/vote/UpvoteButton";
import DownvoteButton from "../buttons/vote/DownvoteButton";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import "./VideoPlayer.css";
import { Container } from "@material-ui/core";
import DashboardBreadcrumbs from "../dashboard/breadcrumbs/DashboardBreadcrumbs";
import UserChip from "../chips/UserChip";

class VideoPlayer extends Component {
  componentDidMount() {
    this.topicName = this.props.match.params.topicName;
    this.subtopicName = this.props.match.params.subtopicName;
    const videoId = this.props.match.params.videoId;
    this.props.getAllVideos(this.topicName, this.subtopicName);
    this.props.getVideo(this.topicName, this.subtopicName, videoId);
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  upvoteVideo() {}

  downvoteVideo() {}

  render() {
    const { videos } = this.props.videos;
    const { video } = this.props.video;
    const { user } = this.props.auth;

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
                className="votes"
                icon={<StarIcon />}
                label={video.votes}
                size="medium"
              />
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
                <p> {video.description}</p>
                <Chip
                  className="rank"
                  icon={<EmojiEventsIcon />}
                  label={
                    this.props.rank +
                    " in " +
                    this.props.match.params.subtopicName
                  }
                  size="medium"
                />
                <Box className="vote-box" component="span" m={1}>
                  <UpvoteButton videoId = {this.props.match.params.videoId} userId = {user.id} />
                  <Chip
                    variant="outlined"
                    className="votes"
                    label={video.votes}
                    size="medium"
                  />
                  <DownvoteButton />
                </Box>
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
  videos: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  videos: state.videos,
  video: state.video,
});

export default connect(mapStateToProps, {
  getAllVideos,
  getVideo,
})(VideoPlayer);
