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
import LinkIcon from "@material-ui/icons/Link";
import "./TopicCard.css";

class TopicCardBack extends Component {
  /**
   * Renders the back of the topic card with the description.
   *
   * @name TopicCardBack Render
   */
  render() {
    return (
      <div className="topic-card">
        <Card className="topic-card-root">
          <Link
            to={{
              pathname: `/dashboard/${this.props.name}`,
              state: { topicId: this.props.topicId },
            }}
          >
            <CardActionArea className="topic-card-back-content">
              <CardContent>
                <Typography
                  className="topic-description"
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  {this.props.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions>
            <Button
              className="topic-card-button-left"
              onClick={() => this.props.confirmCopied()}
              size="small"
              color="primary"
            >
              <LinkIcon />
            </Button>
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

TopicCardBack.propTypes = {
  name: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  flipFunction: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  confirmCopied: PropTypes.func.isRequired,
};

export default TopicCardBack;
