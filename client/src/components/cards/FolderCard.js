import React, { Component } from "react";
import PropTypes from "prop-types";
import "./FolderCard.css";

class FolderCard extends Component {
  render() {
    return (
		<div>
			<div class="card">
				<div class="overlay"></div>
				<div class="content">
    <h4>{this.props.name}</h4>
    <h6>{this.props.length + " videos in " + this.props.name}</h6>
				</div>
				<div class="fav">
					<i class="far fa-heart"></i>
				</div>
			</div>
		</div>

    );
  }
}

FolderCard.propTypes = {
  name: PropTypes.string,
  length: PropTypes.number,
};
export default FolderCard;
