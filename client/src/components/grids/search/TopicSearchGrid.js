import { connect } from "react-redux";
import React, { Component } from "react";
import { searchTopic } from "../../../actions/topicActions";
import PropTypes from "prop-types";
import TopicCard from "../../cards/TopicCard";
import Grid from "@material-ui/core/Grid";
import "../TopicGrid.css";

class TopicSearchGrid extends Component {
  /**
   * After successful render, send a request to server with a search query.
   *
   * @name componentDidMount Wait
   */
  componentDidMount() {
    this.props.searchTopic(this.props.query);
  }

  /**
   * Renders the search results for topics in a grid format.
   *
   * @name TopicSearchGrid Render
   */
  render() {
    const { topics } = this.props.topics;
    if (topics.length > 0) {
      // topics are found matching query
      return (
        <div className="topic-grid-root">
          <h3 className="title">Topics:</h3>
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
    } else {
      // no subtopics are found matching query
      return (
        <div className="no-topics-message">
          <h3>No Topics that Matched '{this.props.query}'.</h3>
        </div>
      );
    }
  }
}

TopicSearchGrid.propTypes = {
  auth: PropTypes.object.isRequired,
  topics: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  searchTopic: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  topics: state.topics,
});

export default connect(mapStateToProps, { searchTopic })(TopicSearchGrid);
