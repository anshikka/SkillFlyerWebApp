import { getAllSubtopics } from "../../actions/subtopicActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import SubtopicCard from "../cards/SubtopicCard";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import noSubtopicsPlaceholder from "./assets/no-subtopics.png";
import "./SubtopicGrid.css";
import Container from "@material-ui/core/Container";
import DashboardBreadcrumbs from "../dashboard/breadcrumbs/DashboardBreadcrumbs";

class SubtopicGrid extends Component {
  /**
   * After successful render, send a request to server to get all subtopics by a certain topic name.
   *
   * @name componentDidMount Wait
   */
  componentDidMount() {
    this.topicName = this.props.match.params.topicName;
    this.props.getAllSubtopics(this.topicName);
  }

  /**
   * Renders the subtopics under a certain topic in a grid format.
   *
   * @name SubtopicGrid Render
   */
  render() {
    const { subtopics } = this.props.subtopics;
    if (subtopics.length > 0) {
      return (
        <div className="subtopic-grid-body">
          <DashboardBreadcrumbs
            pageType="subtopics"
            topicName={this.topicName}
            topicId={this.topicId}
          />
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
          <img src={noSubtopicsPlaceholder} alt="no-subtopics" />
          <h1>No Subtopics Under {this.props.match.params.topicName}</h1>
          <p>Check back later to study this new subtopic!</p>
        </div>
      );
    }
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
