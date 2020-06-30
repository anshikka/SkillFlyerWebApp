import React, { Component } from "react";
import PropTypes from "prop-types";
import "./FolderCard.css";

class FolderCard extends Component {
  render() {
    return (
      <div>
        <div class="col-md-4 folder">
          <div class="card card-1">
            <div id="folder-name">
              <h3 className="folder-card-name">{this.props.name}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FolderCard.propTypes = {
  name: PropTypes.string,
};
export default FolderCard;
