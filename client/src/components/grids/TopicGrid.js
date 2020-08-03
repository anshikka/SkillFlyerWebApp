import { getAllTopics } from "../../actions/topicActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import TopicCard from "../cards/TopicCard";
import Grid from "@material-ui/core/Grid";
import DashboardBreadcrumbs from "../dashboard/breadcrumbs/DashboardBreadcrumbs";
import "./TopicGrid.css";

class TopicGrid extends Component {
  /**
   * After successful render, send a request to server to get all topics on SkillFlyer.
   *
   * @name componentDidMount Wait
   */
  componentDidMount() {
    this.props.getAllTopics();
  }

  /**
   * Renders all topics in a grid format.
   *
   * @name TopicGrid Render
   */
  render() {
    const { topics } = this.props.topics;
    return (
      <div className = "topic-grid-root">
        <DashboardBreadcrumbs pageType="topics" />
        <Grid className="topic-grid-container" container spacing={10}>
          {topics.map((topic) => (
            <Grid className="topic-card-grid-item" item xs key={topic._id}>
              <TopicCard
                name={topic.topic_name}
                topicId={topic._id}
                photoUrl={topic.photo_url}
                description={topic.description}
              />
            </Grid>
          ))}
        </Grid>
      </div>
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
