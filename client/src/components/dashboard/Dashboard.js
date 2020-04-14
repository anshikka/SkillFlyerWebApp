import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import AuthenticatedNavbar from "../layout/AuthenticatedNavbar";
import TopicGrid from "../grids/TopicGrid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SubtopicGrid from "../grids/SubtopicGrid";
import "./Dashboard.css";
import PrivateRoute from "../private-route/PrivateRoute";
import Navbar from "../layout/Navbar";
import TopicCard from "../cards/TopicCard";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <AuthenticatedNavbar color={"white"}/>
        <div>
          <Switch>
            <Route exact path="/dashboard" component={TopicGrid} />
            <Route exact path="/dashboard/:topicName" component={SubtopicGrid} />
          </Switch>
        </div>
      </div>
    );
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
