import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import LinkIcon from "@material-ui/icons/Link";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import BookIcon from "@material-ui/icons/Book";
import DnsIcon from "@material-ui/icons/Dns";
import "./AddVideoModal.css";

class AddVideoModal extends Component {
  render() {
    return (
      <Modal
        className="add-video-modal"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <div class="row">
          <div class="col-md-12">
            <form action="index.html" method="post">
              <h1> Sign Up </h1>

              <fieldset>
                <legend>
                  <span class="number">1</span> Your Basic Info
                </legend>

                <label for="name">Name:</label>
                <input type="text" id="name" name="user_name" />

                <label for="email">Email:</label>
                <input type="email" id="mail" name="user_email" />

                <label for="password">Password:</label>
                <input type="password" id="password" name="user_password" />

                <label>Age:</label>
                <input
                  type="radio"
                  id="under_13"
                  value="under_13"
                  name="user_age"
                />
                <label for="under_13" class="light">
                  Under 13
                </label>
                <br />
                <input
                  type="radio"
                  id="over_13"
                  value="over_13"
                  name="user_age"
                />
                <label for="over_13" class="light">
                  Over 13
                </label>
              </fieldset>
              <fieldset>
                <legend>
                  <span class="number">2</span> Your Profile
                </legend>

                <label for="bio">Bio:</label>
                <textarea id="bio" name="user_bio"></textarea>

                <label for="job">Job Role:</label>
                <select id="job" name="user_job">
                  <optgroup label="Web">
                    <option value="frontend_developer">
                      Front-End Developer
                    </option>
                    <option value="php_developer">PHP Developer</option>
                    <option value="python_developer">Python Developer</option>
                    <option value="rails_developer">Rails Developer</option>
                    <option value="web_designer">Web Designer</option>
                    <option value="wordpress_developer">
                      Wordpress Developer
                    </option>
                  </optgroup>
                  <optgroup label="Mobile">
                    <option value="android_developer">Android Developer</option>
                    <option value="ios_developer">IOS Developer</option>
                    <option value="mobile_designer">Mobile Designer</option>
                  </optgroup>
                  <optgroup label="Business">
                    <option value="business_owner">Business Owner</option>
                    <option value="freelancer">Freelancer</option>
                  </optgroup>
                </select>

                <label>Interests:</label>
                <input
                  type="checkbox"
                  id="development"
                  value="interest_development"
                  name="user_interest"
                />
                <label class="light" for="development">
                  Development
                </label>
                <br />
                <input
                  type="checkbox"
                  id="design"
                  value="interest_design"
                  name="user_interest"
                />
                <label class="light" for="design">
                  Design
                </label>
                <br />
                <input
                  type="checkbox"
                  id="business"
                  value="interest_business"
                  name="user_interest"
                />
                <label class="light" for="business">
                  Business
                </label>
              </fieldset>

              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}
AddVideoModal.propTypes = {};

export default AddVideoModal;
