import React, { Component } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PropTypes from "prop-types";

class DownvoteButton extends Component {
  render() {
    /*if (disliked_video) {
    return (
      <KeyboardArrowDownIcon color="goldenrod" className="vote-button" />

    );
  } else {*/
    return <KeyboardArrowDownIcon className="vote-button" />;
  }
}
//}
DownvoteButton.propTypes = {
  disliked_video: PropTypes.bool.isRequired,
};

export default DownvoteButton;
