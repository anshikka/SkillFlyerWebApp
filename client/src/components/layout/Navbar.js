import React, { Component } from "react";
import {AppBar, Toolbar} from '@material-ui/core';
import './Navbar.css'
import darkLogo from './assets/logo-dark.svg'
import whiteLogo from './assets/logo-white.svg'
class Navbar extends Component {
  render() {
    var logo;
    if (this.props.color === 'white') {
      logo = whiteLogo;
    }
    else {
      logo= darkLogo;
    }
    return (
      <AppBar id = "appbar" position="static">
        <Toolbar id = "toolbar">
          <a href='/'>
            <img alt= {'logo'} id="navbar-logo" src={logo} />
          </a>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Navbar;
