import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from "../../actions/userActions";
import FaceIcon from "@material-ui/icons/Face";
import Chip from "@material-ui/core/Chip";

class UserChip extends Component {
  /**
   * After render, load the user information for the video.
   *
   * @name componentWillMount Wait
   */
  componentWillMount() {
    this.props.getUser(this.props.user_id);
  }

  /**
   * After successful render, track changes to any updated video owner data.
   *
   * @name componentDidUpdate Wait
   *
   * @param {Object} [prevProps] is the response from the server after changes.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.user_id !== this.props.user_id) {
      this.props.getUser(this.props.user_id);
    }
  }

  /**
   * Renders the chip with the user's name.
   *
   * @name UserChip Render
   */
  render() {
    const { user } = this.props.user;
    return (
      <Chip
        variant="outlined"
        className="added-by"
        icon={<FaceIcon />}
        label={user.name}
        size="medium"
      />
    );
  }
}

UserChip.propTypes = {
  user_id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUser })(UserChip);
