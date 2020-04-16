import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./TopicCard.css"




class TopicCard extends Component {
  render() {

    return (
        <div id = "card">
        <Card id = "card-root">
        <CardActionArea>
          <CardMedia
            id = "card-media"
            image={this.props.photoUrl}
            title={this.props.name}
          />
          <CardContent>
            <Typography id = "topic-name" gutterBottom variant="h5" component="h2">
              {this.props.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button href = "iamgay"size="small" color="primary">
            Share
          </Button>
          <Button href = "iammoregay"size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      </div>
    );
  }
}

TopicCard.propTypes = {
 name: PropTypes.string,
 photoUrl: PropTypes.string,
 topicId: PropTypes.string
};
export default TopicCard;
