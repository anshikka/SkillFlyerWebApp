import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SubtopicCard.css";

class SubtopicCard extends Component {
  render() {
    return (
      <div>
        <div class="col-md-4">
          <div class="card card-1">
            <h3>Theming</h3>
            <p>
              Learn how to easily customize and modify your app’s design to fit
              your brand across all mobile platform styles.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

SubtopicCard.propTypes = {
  name: PropTypes.string,
  photoUrl: PropTypes.string,
  subtopicId: PropTypes.string,
  topicId: PropTypes.string
};
export default SubtopicCard;
