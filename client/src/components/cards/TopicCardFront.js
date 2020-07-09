import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LinkIcon from "@material-ui/icons/Link";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./TopicCard.css";

class TopicCardFront extends Component {
  render() {
    return (
      <div id="card">
        <Card id="card-root">
          <Link
            to={{
              pathname: `/dashboard/${this.props.name}`,
              state: { topicId: this.props.topicId },
            }}
          >
            <CardActionArea>
              <CardMedia
                id="card-media"
                image={this.props.photoUrl}
                title={this.props.name}
              />
              <CardContent>
                <Typography
                  id="topic-name"
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  {this.props.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions>
            <CopyToClipboard
              text={window.location.href + "/" + this.props.name}
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
              <MoreVertIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

TopicCardFront.propTypes = {
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  flipFunction: PropTypes.func.isRequired,
  confirmCopied: PropTypes.func.isRequired,
};
export default TopicCardFront;
