import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import SubtopicCard from "../cards/SubtopicCard";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "./SubtopicGrid.css";
import Container from "@material-ui/core/Container";

class SubtopicSearchGrid extends Component {
  componentDidMount() {
 
  }
  render() {
    const { subtopics } = this.props.subtopics;
      return (
        <div className="subtopic-grid-body">
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
                      pathname: `/dashboard/${this.props.match.params.topicName}/${subtopic.subtopic_name}`,
                      state: { subtopicId: subtopic._id, topicId: subtopic.topic_id },
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
    } 
}

SubtopicSearchGrid.propTypes = {
  auth: PropTypes.object.isRequired,
  subtopics: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  subtopics: state.subtopics,
});
export default connect(mapStateToProps)(SubtopicSearchGrid);
