import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SubtopicCard.css";

class SubtopicCard extends Component {
  /**
   * Renders the Subtopic Card with basic subtopic information.
   *
   * @name SubtopicCard Render
   */
  render() {
    return (
      <div>
        <div class="col-md-4 subtopic-root">
          <div class="subtopic-card card-1">
            <img
              alt={this.props.name + "-icon"}
              className="icon"
              src={this.props.photoUrl}
            />
            <div id="title-and-desc">
              <b><text className="subtopic-card-name">{this.props.name}</text></b>
              <p className="subtopic-card-description">
                {this.props.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SubtopicCard.propTypes = {
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SubtopicCard;
