import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoCard from "../cards/VideoCard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "./VideoGrid.css";

class VideoSearchGrid extends Component {
    componentDidMount() {

    }
    render() {
        const { videos } = this.props.videos;
        return (
            <div className="video-grid-root">
                <Grid className="video-grid-container" container spacing={10}>
                    {videos.map((video, index) => (
                        <Grid className="video-card-grid-item" item xs key={video._id}>
                            <Container>
                                <VideoCard
                                    videoId={video._id}
                                    subtopicId={video.subtopic_id}
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
                    open={this.state.isOpened}
                    metaExists={true}
                    onClose={this.handleAddVideo}
                />
            </div>
        );

    }
}

VideoSearchGrid.propTypes = {
    auth: PropTypes.object.isRequired,
    videos: PropTypes.object.isRequired,
    errors: PropTypes.object,
    video: PropTypes.object,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    videos: state.videos,
    video: state.video,
    errors: state.errors,
});
export default connect(mapStateToProps)(VideoSearchGrid);
