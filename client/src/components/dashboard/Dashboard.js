import React, { Component } from "react";
import PropTypes from "prop-types";
import AdSense from 'react-adsense';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import AuthenticatedNavbar from "../layout/AuthenticatedNavbar";
import TopicGrid from "../grids/TopicGrid";
import VideoGrid from "../grids/VideoGrid";
import FolderGrid from "../grids/FolderGrid";
import SearchGrid from "../grids/search/SearchGrid";
import { Route, Switch } from "react-router-dom";
import SubtopicGrid from "../grids/SubtopicGrid";
import "./Dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import VideoPlayer from "../player/VideoPlayer";
import FolderVideoGrid from "../grids/FolderVideoGrid";

class Dashboard extends Component {
  /**
   * Log the user out after function is called.
   *
   * @name Dashbord Logout
   *
   * @param {object} [e] is the event target being tracked.
   */
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  /**
   * Renders the base dashboard and displays the correct component according to the link.
   *
   * @name Dashboard Render
   */
  render() {
    const { user } = this.props.auth;
    if (user) {
      // user is authenticated
      return (
        <div>
          <AuthenticatedNavbar color={"white"} />
          <Switch>
            <Route exact path="/dashboard" component={TopicGrid} />
            <Route exact path="/dashboard/folders" component={FolderGrid} />
            <Route exact path="/dashboard/search" component={SearchGrid} />
            <Route
              exact
              path="/dashboard/folders/:folderId"
              component={FolderVideoGrid}
            />
            <Route
              exact
              path="/dashboard/:topicName"
              component={SubtopicGrid}
            />
            <Route
              exact
              path="/dashboard/:topicName/:subtopicName"
              component={VideoGrid}
            />
            <Route
              exact
              path="/dashboard/:topicName/:subtopicName/videos/:videoId"
              component={VideoPlayer}
            />
          </Switch>
          <ToastContainer
            style={{ textAlign: "center" }}
            autoClose={4000}
            position="bottom-center"
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            draggable={false}
            pauseOnHover={false}
          />
          <AdSense.Google
            client="pub-4986329421006402"
            slot="9439697200"
            style={{ display: "block" }}
            format="auto"
            responsive="true"
            layoutKey="-gw-1+2a-9x+5c"
          />
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
