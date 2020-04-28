import React, { Component } from "react";
import PropTypes from "prop-types";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import LinkIcon from "@material-ui/icons/Link";
import Button from "@material-ui/core/Button";
import "./VideoItemCSS.css";
class VideoItemFront extends Component {
  state = {
    open: false,
  };
  handleToggle = () => {
    this.setState((prevState) => ({ open: !prevState.open }));
    console.log("Clicked!");
  };

  render() {
    return (
      <div class="row">
        <div class="example-1 card">
          <div class="wrapper">
            <div className="left-content">
              <div class="date">
                <span class="day">{this.props.rank + 1}</span>
              </div>
            </div>
            <div class="image">
              <img class="book-image" src={this.props.thumbnailUrl} />
            </div>

            <div class="data">
              <div class="content">
                <h1 class="title">
                  <a href="#" class="cardTitle">
                    {this.props.title}
                  </a>
                </h1>
                <div className="video-card-buttons">
                  <Button
                    className="button video-card-button-left"
                    onClick={() => this.props.flipFunction()}
                    size="small"
                    color="primary"
                  >
                    <SwapVertIcon />
                  </Button>
                  <Button
                    className="video-card-button-right"
                    onClick={() => this.props.confirmCopied()}
                    size="small"
                    color="primary"
                  >
                    <LinkIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VideoItemFront.propTypes = {
  videoId: PropTypes.string,
  topicName: PropTypes.string,
  subtopicName: PropTypes.string,
  addedBy: PropTypes.string,
  title: PropTypes.string,
  thumbnail_url: PropTypes.string,
  rank: PropTypes.number,
};

export default VideoItemFront;
