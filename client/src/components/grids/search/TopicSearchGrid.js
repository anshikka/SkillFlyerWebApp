import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import TopicCard from "../cards/TopicCard";
import Grid from "@material-ui/core/Grid";
import "./TopicGrid.css";

class TopicSearchGrid extends Component {
  componentDidMount() {

  }
  render() {
    const { topics } = this.props.topics;
    return (
      <div className = "topic-grid-root">
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

TopicSearchGrid.propTypes = {
  auth: PropTypes.object.isRequired,
  topics: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  topics: state.topics,
});
export default connect(mapStateToProps)(TopicSearchGrid);
