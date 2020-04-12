import React, { Component } from "react";

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
            image="https://online.jwu.edu/sites/default/files/styles/article_feature_page/public/field/image/BS%20Computer%20Science%20Degree%20A%20Closer%20Look.jpg?itok=ljcfRgAe"
            title="Computer Science"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Computer Sciecne
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      </div>
    );
  }
}


export default TopicCard;
