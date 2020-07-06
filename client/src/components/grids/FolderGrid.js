import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { getAllFolders } from "../../actions/folderActions";
import FolderCard from "../cards/FolderCard";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "./FolderGrid.css";
import Container from "@material-ui/core/Container";

class FolderGrid extends Component {
    componentDidMount() {
        this.props.getAllFolders({ user_id: this.props.auth.user.id });

    }
    render() {
        const { folders } = this.props.folders;
        return (
            <div id="folder-grid-body">
                <Grid id="folder-grid-container" container spacing={10}>
                    {folders.map((folder) => (
                        <Grid
                            className="folder-card-grid-item"
                            key={folder._id}
                            item
                            xs
                        >
                        

                                <FolderCard
                                    name={folder.folder_name}
                                    length = {folder.videos.length}
                                />

                           
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

FolderGrid.propTypes = {
    auth: PropTypes.object.isRequired,
    getAllFolders: PropTypes.func.isRequired,
    folders: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    folders: state.folders,
});
export default connect(mapStateToProps, { getAllFolders })(FolderGrid);
