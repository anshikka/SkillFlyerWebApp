import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserDislikedVideo } from "../../../actions/authActions";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PropTypes from "prop-types";
import "./VoteButton.css";

class UpvoteButton extends Component {
  componentDidMount() {
    this.props.getUserDislikedVideo(this.props.userId, this.props.videoId);
  }
  render() {
    const { disliked_video } = this.props.auth;
    if (disliked_video.video_disliked === "true") {
      return <KeyboardArrowDownIcon className="vote-button vote-selected" />;
    } else {
      return <KeyboardArrowDownIcon className="vote-button" />;
    }
  }
}
UpvoteButton.propTypes = {
  userId: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserDislikedVideo })(UpvoteButton);
