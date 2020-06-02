import React, { Component } from "react";
import PropTypes from "prop-types";
import { getUser } from "../../actions/userActions";
import FaceIcon from "@material-ui/icons/Face";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";

class UserChip extends Component {
  componentDidMount() {
    this.props.getUser(this.props.user_id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user_id !== this.props.user_id) {
      this.props.getUser(this.props.user_id);
    }
  }
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
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps, { getUser })(UserChip);
