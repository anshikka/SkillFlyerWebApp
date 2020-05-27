import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactCardFlip from "react-card-flip";
import TopicCardFront from "./TopicCardFront";
import TopicCardBack from "./TopicCardBack";
import { toast } from "react-toastify";
import "./TopicCard.css";

class TopicCard extends Component {
  state = {
    isFlipped: false,
  };

  handleLearnMore = () => {
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  };

  confirmCopied = () => {
    toast.info("Link copied to clipboard!");
  };

  render() {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <TopicCardFront
          confirmCopied={this.confirmCopied}
          flipFunction={this.handleLearnMore}
          name={this.props.name}
          photoUrl={this.props.photoUrl}
          topicId={this.props.topicId}
        />
        <TopicCardBack
          confirmCopied={this.confirmCopied}
          flipFunction={this.handleLearnMore}
          name={this.props.name}
          description={this.props.description}
          topicId={this.props.topicId}
        />
      </ReactCardFlip>
    );
  }
}

TopicCard.propTypes = {
  name: PropTypes.string,
  photoUrl: PropTypes.string,
  topicId: PropTypes.string,
  description: PropTypes.string,
};
export default TopicCard;
