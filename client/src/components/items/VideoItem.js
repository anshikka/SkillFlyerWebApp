import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import "./VideoItemCSS.css";

class VideoItem extends Component {
  render() {
    return (
      <Card className="video-card-root">
        <div class="video-media">
          <CardMedia
            className="card-video-thumbnail"
            image={this.props.thumbnailUrl}
            title={this.props.title}
          />
        </div>
        <div class="video-details">
          <CardHeader title={this.props.title} />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to folder">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          {/*<div class="video-personalization">
          <Fab color="primary" aria-label="add">
            <AddIcon />
    </Fab>
    </div>*/}
        </div>
        
      </Card>
    );
  }
}

VideoItem.propTypes = {
  videoId: PropTypes.string,
  video: PropTypes.object,
  getVideo: PropTypes.func,
  topicName: PropTypes.string,
  subtopicName: PropTypes.string,
  added_by: PropTypes.string,
  title: PropTypes.string,
  thumbnail_url: PropTypes.string,
  description: PropTypes.string,
};

export default VideoItem;
