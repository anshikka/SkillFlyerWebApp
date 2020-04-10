import React, { Component } from "react";
import {AppBar, Toolbar} from '@material-ui/core';
import './AuthenticatedNavbar.css'
import darkLogo from './assets/logo-dark.svg'
import whiteLogo from './assets/logo-white.svg'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import InputBase from '@material-ui/core/InputBase';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";

class AuthenticatedNavbar extends Component {
  render() {
    var logo;
    if (this.props.color === 'white') {
      logo = whiteLogo;
    }
    else {
      logo= darkLogo;
    }
    const { user } = this.props.auth;

    return (
      <AppBar id = "appbar-auth" position="static">
        <Toolbar id = "toolbar-auth">
          <a id="navbar-logo-link" href='/dashboard'>
            <img alt= {'logo'} id="navbar-logo" src={logo} />
          </a>
          <div id="navbar-search">
            <InputBase id = "search-input" placeholder="&#xF002; Search for topics, subtopics, or videos..." inputProps={{ 'aria-label': 'search' }}></InputBase>
          </div>
          <a href = "/api/users/" id="navbar-user-link">
            <PersonRoundedIcon className="navbar-icon" />
            <figcaption>{user.name.split(" ")[0]}</figcaption>
          </a>
        </Toolbar>
      </AppBar>
    );
  }
}

AuthenticatedNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps, { logoutUser })(AuthenticatedNavbar);
