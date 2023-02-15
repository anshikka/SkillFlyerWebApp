import React, { Component } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import "./Navbar.css";
import darkLogo from "./assets/logo-dark.svg";
import whiteLogo from "./assets/logo-white.svg";
class Navbar extends Component {
  /**
   * Renders the navbar when the user is not authenticated. Shows logo.
   *
   * @name Navbar Render
   */
  render() {
    var logo;
    if (this.props.color === "white") {
      logo = whiteLogo;
    } else {
      logo = darkLogo;
    }
    return (
      <AppBar id="appbar-unauth" position="static">
        <Toolbar id="toolbar">
          <a href="/">
            <img alt={"logo"} id="navbar-logo" src={logo} />
          </a>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Navbar;
