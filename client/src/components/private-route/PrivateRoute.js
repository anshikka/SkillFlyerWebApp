import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/* This combines all of the state objects that will be updated when a user is logged into SkillFlyer.
 * If the user isn't authenticated, it pushes the user back to the login page.
 */
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
  folders: state.folders,
});

export default connect(mapStateToProps)(PrivateRoute);
