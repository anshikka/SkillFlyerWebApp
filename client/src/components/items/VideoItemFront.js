import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import LinkIcon from '@material-ui/icons/Link';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Badge from "@material-ui/core/Badge";
import "./VideoItemCSS.css";
class VideoItemFront extends Component {
  

    render() {
      return (
        <div className="video-card">
          <Card className="video-card-root">
              <CardActionArea>
                <CardMedia
                  className="video-card-media"
                  image={this.props.thumbnailUrl}
                  title={this.props.title}
                />
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
              </CardActionArea>
            <CardActions>
              <CopyToClipboard text={window.location.href + "/videos/" + this.props.videoId}>
              <Button className = "video-card-button-left" onClick={()=> this.props.confirmCopied()} size="small" color="primary">
                <LinkIcon/>
              </Button>
              </CopyToClipboard>
              <Button className = "video-card-button-right" onClick={()=>this.props.flipFunction()} size="small" color="primary">
                <MoreVertIcon/>
              </Button>
            </CardActions>
          </Card>
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
    rank: PropTypes.number
  };

  export default VideoItemFront;
