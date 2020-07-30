import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Navbar from "./Navbar";

class Landing extends Component {
  
  /**
   * Renders the landing page to login or register.
   *
   * @name Landing Render
   */
  render() {
    return (
      <div className="background">
        <Navbar color={"white"} />
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h2>
                <b>Enhance</b> your STEM skills with{" "}
                <div id="intextdiv">
                  <img
                    alt="logo"
                    align="bottom"
                    id="logo-intext"
                    src={require("./assets/logo-white.svg")}
                  />
                </div>
              </h2>
              <br />
              <div className="col s6">
                <Link
                  to="/register"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable accent-3"
                  id="register-button"
                >
                  Register
                </Link>
              </div>
              <div className="col s6">
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large btn-flat waves-effect white "
                  id="login-button"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
