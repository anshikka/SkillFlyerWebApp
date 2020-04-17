import { getAllSubtopics } from "../../actions/subtopicActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import SubtopicCard from "../cards/SubtopicCard";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "./SubtopicGrid.css";

class SubtopicGrid extends Component {
  componentDidMount() {
    const topicName = this.props.match.params.topicName
    this.props.getAllSubtopics(topicName);
  }
  render() {
    const { subtopics } = this.props.subtopics;
    return (
      <div id="subtopic-grid-body">
      <Grid id="subtopic-grid-container" container spacing={10}>
        {subtopics.map((subtopic) => (
          <Grid className="subtopic-card-grid-item" key={subtopic._id} item xs>
            <Link to= {`/dashboard/${this.props.match.params.topicName}/${subtopic.subtopic_name}`}>
            <SubtopicCard
            name = {subtopic.subtopic_name}
            photoUrl = {subtopic.photo_url}
            description = {subtopic.description}
            />
            </Link>
          </Grid>
        ))}
      </Grid>
      </div>
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
