import { getAllSubtopics } from "../../actions/subtopicActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import SubtopicCard from "../cards/SubtopicCard";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "./TopicGrid.css";

class SubtopicGrid extends Component {
  componentDidMount() {
    const topicName = this.props.match.params.topicName
    this.props.getAllSubtopics(topicName);
    console.log(topicName)
  }
  render() {
    const { subtopics } = this.props.subtopics;
    return (
      <Grid id="topic-grid-container" container spacing={10}>
        {subtopics.map((subtopic) => (
          <Grid className="topic-card-grid-item" item xs>
            <Link to= {`/dashboard/${this.props.match.params.topicName}/${subtopic.subtopic_name}`}>
            <SubtopicCard/>
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }
}

SubtopicGrid.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllSubtopics: PropTypes.func.isRequired,
  subtopics: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  subtopics: state.subtopics,
});
export default connect(mapStateToProps, { getAllSubtopics })(SubtopicGrid);
