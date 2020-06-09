import React, { Component } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";

class VoteChip extends Component {
  render() {
    return (
      <Chip
        variant="outlined"
        className="votes"
        label={this.props.votes}
        size="medium"
      />
    );
  }
}

VoteChip.propTypes = {
  votes: PropTypes.number.isRequired,
};
export default VoteChip;
