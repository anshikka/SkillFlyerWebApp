import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Select from "react-select";
import YouTube from "react-youtube";
import "./AddVideoModal.css";

class AddVideoModal extends Component {
  state = {
    youtube_id: "",
    topicName: this.props.topicName,
    subtopicName: this.props.subtopicName,
    youtube_link: "",
  };

  /**
   * Submit video data from the form to the server.
   *
   * @name AddFolderModal Submit
   *
   * @param {object} [e] is the event target being tracked.
   */
  handleAddVideo = (e) => {
    e.preventDefault();
    const newVideo = {
      youtube_url: this.state.youtube_link,
      added_by: this.props.user.id,
      topic_name: this.state.topicName,
      subtopic_name: this.state.subtopicName,
    };
    this.props.submitVideo(newVideo);
  };

  /**
   * After successful render, send a request to server to fill in current topic and subtopic.
   *
   * @name componentDidMount Wait
   */
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

  /**
   * Update current state with YouTube video URL.
   *
   * @name AddVideoModal Update
   *
   * @param {object} [e] is the event target being tracked.
   */
  loadYoutubeVideo = (e) => {
    const youtube_url = e.target.value;
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=|\?v=)([^#]*).*/;
    var match = youtube_url.match(regExp);
    if (match && match[2].length === 11) {
      this.setState(() => ({
        youtube_id: match[2],
        youtube_link: youtube_url,
      }));
    }
  };

  /**
   * Renders the modal with the form to submit the video and a preview box for the video.
   *
   * @name AddVideoModal Render
   */
  render() {
    return (
      <Modal
        className="add-video-modal"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <Container className="add-video-modal-root">
          <Container className="form-body">
            <form className="add-video-form" onSubmit={this.handleAddVideo}>
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
                  required
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
  user: PropTypes.object.isRequired,
};

export default AddVideoModal;
