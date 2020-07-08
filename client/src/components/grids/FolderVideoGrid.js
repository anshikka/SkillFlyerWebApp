import { getFolderContent } from "../../actions/folderActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import FolderVideoCard from "../cards/FolderVideoCard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import noVideosPlaceholder from "./assets/no-videos.png";
import "./VideoGrid.css";

class FolderVideoGrid extends Component {
    componentDidMount() {
        this.props.getFolderContent(
            {
                folder_id: this.props.match.params.folderId
            }
        );


    }



    render() {
        if (this.props.folders.folder_content_loaded === true) {
            return (

                <div>

                    <Grid id="video-grid-container" container spacing={10}>
                        {this.props.folders.folder.videos.map((videoId, index) => (
                            
                            <Grid className="video-card-grid-item" item xs key={index}>
                                <Container>
                                    <FolderVideoCard
                                        videoId={videoId}
                                    />
                                </Container>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            );

        } else {
            return (
                <div class="empty-page">

                    <div className="no-videos-message">
                        <img src={noVideosPlaceholder} alt="no-videos" />
                        <h1>No Videos Under {this.props.match.params.subtopicName}</h1>
                        <p>Be the first to add a video to this subtopic!</p>

                    </div>
                </div>);
        }
    }

}

FolderVideoGrid.propTypes = {
    getFolderContent: PropTypes.func.isRequired,
    folders: PropTypes.object.isRequired,
    errors: PropTypes.object,
};
const mapStateToProps = (state) => ({
    folders: state.folders,
    errors: state.errors,
    auth: state.auth,

});
export default connect(mapStateToProps, { getFolderContent })(FolderVideoGrid);
