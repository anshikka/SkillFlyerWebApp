import React, { Component } from "react";
import { Link } from "react-router-dom";
import {AppBar, Toolbar} from '@material-ui/core';
import './Navbar.css'
class Navbar extends Component {
  render() {
    return (
      <AppBar id = "appbar" position="static">
        <Toolbar id = "toolbar">
          <img id = "navbar-logo" src = {require ("./assets/SkillFlyer_logo_WHITE.png")}/>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Navbar;
