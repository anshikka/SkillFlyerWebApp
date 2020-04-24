import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LinkIcon from "@material-ui/icons/Link";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Modal from "@material-ui/core/Modal";
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
      <div className="video-card">
        <Card className="video-card-root">
          <CardHeader
            className="video-card-header"
            title={
              "Ranked #" +
              (this.props.rank + 1) +
              " in " +
              this.props.subtopicName
            }
          />
          <CardActionArea
            onClick={this.handleToggle}
            className="video-card-thumbnail"
          >
            <span></span>
            <CardMedia
              className="video-card-media"
              image={this.props.thumbnailUrl}
              title={this.props.title}
            />
          </CardActionArea>
          <CardContent>
            <Typography
              className="video-name"
              gutterBottom
              variant="h5"
              component="h2"
            >
              {this.props.title}
            </Typography>
          </CardContent>
          <CardActions>
            <CopyToClipboard
              text={window.location.href + "/videos/" + this.props.videoId}
            >
              <Button
                className="video-card-button-left"
                onClick={() => this.props.confirmCopied()}
                size="small"
                color="primary"
              >
                <LinkIcon />
              </Button>
            </CopyToClipboard>
            <Button
              className="video-card-button-right"
              onClick={() => this.props.flipFunction()}
              size="small"
              color="primary"
            >
              <MoreVertIcon />
            </Button>
          </CardActions>
        </Card>
        <Modal
          className="video-player-modal"
          open={this.state.open}
          onClose={this.handleToggle}
        > 
        <h1>Video Placed Here!</h1>
        </Modal>
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
