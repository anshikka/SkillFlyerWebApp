import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getAllTopics } from "../../actions/topicActions";
import AuthenticatedNavbar from "../layout/AuthenticatedNavbar";
import TopicCard from "../cards/TopicCard";
import Grid from "@material-ui/core/Grid";
import "./Dashboard.css";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  componentDidMount() {
    this.props.getAllTopics();
  }
  render() {
    const { user } = this.props.auth;
    const { topics } = this.props.topics;
    console.log(topics);
    return (
      <div>
        <AuthenticatedNavbar color={"white"} />
        <Grid id = "topic-grid-container"container spacing={10}>
          {topics.map((topic) => (
          <Grid className = "topic-card-grid-item" item xs>
            <TopicCard name={topic.topic_name} topicId={topic._id} photoUrl={topic.photo_url}/>
          </Grid> 
          ))}
          
        </Grid>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getAllTopics: PropTypes.func.isRequired,
  topics: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  topics: state.topics,
});
export default connect(mapStateToProps, { logoutUser, getAllTopics })(
  Dashboard
);
