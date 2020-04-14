import { getAllTopics } from "../../actions/topicActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import TopicCard from "../cards/TopicCard";
import Grid from "@material-ui/core/Grid";
import { Route, Link, Switch } from "react-router-dom";
import SubtopicGrid from "./SubtopicGrid"
import "./TopicGrid.css";

class TopicGrid extends Component {
  componentDidMount() {
    this.props.getAllTopics();
  }
  render() {
    const { topics } = this.props.topics;
    return (
      <Grid id="topic-grid-container" container spacing={10}>
        {topics.map((topic) => (
          <Grid className="topic-card-grid-item" item xs key={topic._id}>
            <Link to= {`/dashboard/${topic.topic_name}`}>
            <TopicCard
              name={topic.topic_name}
              topicId={topic._id}
              photoUrl={topic.photo_url}
            />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }
}

TopicGrid.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllTopics: PropTypes.func.isRequired,
  topics: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  topics: state.topics,
});
export default connect(mapStateToProps, { getAllTopics })(TopicGrid);
