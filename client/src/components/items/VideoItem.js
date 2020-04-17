import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Icon, Item, Image } from "semantic-ui-react";


class VideoItem extends Component {
  
  render() {
    return (
      <Item>
        <Item.Image src={this.props.thumbnailUrl} />
        <Item.Content>
          <Item.Header as="a">{this.props.title}</Item.Header>
          <Item.Meta>
            <span className="cinema">Added by {this.props.addedBy}</span>
          </Item.Meta>
          <Item.Description>{this.props.description}</Item.Description>
          <Item.Extra>
            <Button primary floated="right">
              Watch
              <Icon name="right chevron" />
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
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
  description: PropTypes.string
};


export default VideoItem;
