import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import "./AuthenticatedNavbar.css";
import darkLogo from "./assets/logo-dark.svg";
import whiteLogo from "./assets/logo-white.svg";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import InputBase from "@material-ui/core/InputBase";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";

class AuthenticatedNavbar extends Component {
  state = { anchorEl: false, searchQuery: '' };

  handleClick = () => {
    this.setState(() => ({ anchorEl: true }));
  };
  handleClose = () => {
    this.setState(() => ({ anchorEl: false }));
  };

  handleChange = (e) => {
    const query = e.target.value;
    this.setState(() => ({
      searchQuery: query,
    }));
  };

  fulfillSearch = (e) => {
    e.preventDefault();
    const search = "/dashboard/search?q=" + this.state.searchQuery;
    console.log(search)
    window.location = search;
  };

  render() {
    var logo;
    if (this.props.color === "white") {
      logo = whiteLogo;
    } else {
      logo = darkLogo;
    }
    const { user } = this.props.auth;

    return (
      <AppBar id="appbar-auth" position="static">
        <Toolbar id="toolbar-auth">
          <a id="navbar-logo-link" href="/dashboard">
            <img alt={"logo"} id="navbar-logo" src={logo} />
          </a>
          <div id="navbar-search">
            <form onSubmit={(e) => this.fulfillSearch(e)}>
            <InputBase
              id="search-input"
              placeholder="&#xF002; Search for topics, subtopics, or videos..."
              inputProps={{ "aria-label": "search" }}
              onChange={(e)=> this.handleChange(e)}
            ></InputBase>
            </form>
          </div>
          <div className="user-menu-root">
            <Button
              className="user-menu-button"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <PersonRoundedIcon className="navbar-icon" />
              <figcaption>{user.name.split(" ")[0]}</figcaption>
            </Button>
            <Menu
              className="user-menu"
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.anchorEl}
              onClose={this.handleClose}
            >
              <MenuItem>
                <Link to={`/dashboard/folders`}>My Folders</Link>
              </MenuItem>
              <MenuItem onClick={this.props.logoutUser}>Logout</MenuItem>
            </Menu>
          </div>
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
