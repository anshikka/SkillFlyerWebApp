import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import AuthenticatedNavbar from "../layout/AuthenticatedNavbar";
import TopicGrid from "../grids/TopicGrid";
import VideoGrid from "../grids/VideoGrid";
import { Route, Switch } from "react-router-dom";
import SubtopicGrid from "../grids/SubtopicGrid";
import "./Dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    if (user) {
      return (
        <div>
          <AuthenticatedNavbar color={"white"} />
          <div>
            <Switch>
              <Route exact path="/dashboard" component={TopicGrid} />
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
            </Switch>
          </div>
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
