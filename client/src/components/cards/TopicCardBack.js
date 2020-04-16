import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./TopicCard.css";

class TopicCardBack extends Component {
  

  render() {

    return (
      <div id="card">
        <Card id="card-root">
          <Link to={`/dashboard/${this.props.name}`}>
            <CardActionArea>
              <CardContent>
                <Typography
                  id="topic-description"
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
            <Button onClick={()=> this.props.confirmCopied()} size="small" color="primary">
              Share
            </Button>
            <Button onClick={()=>this.props.flipFunction()} size="small" color="primary">
              Back
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
  confirmCopied: PropTypes.func.isRequired
};
export default TopicCardBack;
