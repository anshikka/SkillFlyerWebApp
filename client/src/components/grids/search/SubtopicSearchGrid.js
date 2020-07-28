import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { searchSubtopic } from "../../../actions/subtopicActions";
import SubtopicCard from "../../cards/SubtopicCard";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "../SubtopicGrid.css";
import Container from "@material-ui/core/Container";

class SubtopicSearchGrid extends Component {
  componentDidMount() {
    this.props.searchSubtopic(this.props.query);
  }
  render() {
    const { subtopics } = this.props.subtopics;
    if (subtopics.length > 0) {
      return (
        <div className="subtopic-grid-body">
          <h2 className="title">Subtopics: </h2>
          <Grid className="subtopic-grid-container" container spacing={10}>
            {subtopics.map((subtopic) => (
              <Grid
                className="subtopic-card-grid-item"
                key={subtopic._id}
                item
                xs
              >
                <Container className="subtopic-card-container">
                  <Link
                    to={{
                      pathname: `/dashboard/${subtopic.topic_name}/${subtopic.subtopic_name}`,
                      state: {
                        subtopicId: subtopic._id,
                        topicId: subtopic.topic_id,
                      },
                    }}
                  >
                    <SubtopicCard
                      name={subtopic.subtopic_name}
                      photoUrl={subtopic.photo_url}
                      description={subtopic.description}
                    />
                  </Link>
                </Container>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="no-subtopics-message">
          <h3>No Subtopics that Matched '{this.props.query}'.</h3>
          <br/>
        </div>
      );
    }
  }
}

SubtopicSearchGrid.propTypes = {
  auth: PropTypes.object.isRequired,
  subtopics: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  searchSubtopic: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  subtopics: state.subtopics,
});
export default connect(mapStateToProps, { searchSubtopic })(SubtopicSearchGrid);
