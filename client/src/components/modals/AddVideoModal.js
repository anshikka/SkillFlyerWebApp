import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Select from "react-select";
import YouTube from "react-youtube";
import "./AddVideoModal.css";
import { Container, Typography } from "@material-ui/core";

class AddVideoModal extends Component {
  state = {
    youtube_id: "",
    topicName: this.props.topicName,
    subtopicName: this.props.subtopicName,
    youtube_link: "",
  };
  
  onSubmit = (e) => {
    console.log(this.state)
    e.preventDefault();
    const newVideo = {
      topic_name: this.state.topicName,
      subtopic_name: this.state.subtopicName,
      youtube_url: this.state.youtube_link,
      added_by: this.props.user.id,
    };
    this.props.submitVideo(newVideo);
  };
  componentDidMount() {
    if (!this.props.subtopicName || !this.props.topicName) {
      // get all topic names and subtopic names
    } else {
      this.topicNames = [
        { label: this.props.topicName, value: this.props.topicName },
      ];
      this.subtopicNames = [
        { label: this.props.subtopicName, value: this.props.subtopicName },
      ];
    }
  }

  loadYoutubeVideo = (e) => {
    const youtube_url = e.target.value;
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = youtube_url.match(regExp);
    if (match && match[2].length === 11) {
      this.setState(() => ({ youtube_id: match[2], youtube_link: youtube_url}));
    }
  };
  render() {
    return (
      <Modal
        className="add-video-modal"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <Container className="add-video-modal-root">
          <Container className="form-body">
            <form className="add-video-form" onSubmit={this.onSubmit}>
              <fieldset>
                <legend>Choose Topic and Subtopic</legend>

                <label for="topic-name">Topic:</label>
                <Select
                  defaultInputValue={this.props.topicName}
                  name="topicName"
                  defaultValue={this.props.topicName}
                  id="topic-name-selector"
                  options={this.topicNames}
                  isDisabled={this.props.metaExists}
                />
                <label for="subtopic-name">Subtopic:</label>
                <Select
                  name="subtopicName"
                  defaultInputValue={this.props.subtopicName}
                  defaultValue={this.props.subtopicName}
                  id="subtopic-name-selector"
                  options={this.subtopicNames}
                  isDisabled={this.props.metaExists}
                />
              </fieldset>
              <fieldset>
                <legend>Link to Video</legend>

                <label for="video-url">Video URL:</label>
                <input
                  onInput={(e) => this.loadYoutubeVideo(e)}
                  onKeyDown={(e) => this.loadYoutubeVideo(e)}
                  value={this.state.youtube_url}
                  type="text"
                  name="youtube_url"
                  pattern="^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$"
                  title="Please enter a valid YouTube link."
                ></input>

              </fieldset>
              <Button
                className="submit-video-button"
                type="submit"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>{" "}
            </form>
          </Container>
          <Container className="video-preview">
            <YouTube
              className="youtube-player"
              videoId={this.state.youtube_id}
            />
          </Container>
        </Container>
      </Modal>
    );
  }
}

AddVideoModal.propTypes = {
  topicName: PropTypes.string,
  subtopicName: PropTypes.string,
  metaExists: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

export default AddVideoModal;
