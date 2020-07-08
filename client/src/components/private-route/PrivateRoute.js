import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const PrivateRoute = ({
  component: Component,
  auth,
  topics,
  subtopics,
  videos,
  video,
  votes,
  user,
  errors,
  folders,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  topics: state.topics,
  subtopics: state.subtopics,
  videos: state.videos,
  video: state.video,
  user: state.user,
  folders: state.folders
});
export default connect(mapStateToProps)(PrivateRoute);
