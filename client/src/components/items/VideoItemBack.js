import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import LinkIcon from "@material-ui/icons/Link";
import "./VideoItemCSS.css";

class VideoItemBack extends Component {
  render() {
    return (
      <div id="card">
        <Card id="card-root">
          <CardActionArea className="video-card-back-content">
            <CardContent>
              <Typography
                className="video-description"
                gutterBottom
                variant="h5"
                component="h2"
              >
                {this.props.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <CopyToClipboard
              text={window.location.href + "/videos/" + this.props.videoId}
            >
              <Button
                className="topic-card-button-left"
                onClick={() => this.props.confirmCopied()}
                size="small"
                color="primary"
              >
                <LinkIcon />
              </Button>
            </CopyToClipboard>
            <Button
              className="topic-card-button-right"
              onClick={() => this.props.flipFunction()}
              size="small"
              color="primary"
            >
              <SwapVertIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

VideoItemBack.propTypes = {
  videoId: PropTypes.string,
  topicName: PropTypes.string,
  subtopicName: PropTypes.string,
  description: PropTypes.string,
};

export default VideoItemBack;
