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

  /**
   * Flip the card if clicked.
   *
   * @name TopicCard Flip
   */
  handleFlip = () => {
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  };

  /**
   * Copy link to topic to clipboard and display confirmation.
   *
   * @name TopicCard Copy URL
   */
  confirmCopied = () => {
    toast.info("Link copied to clipboard!");
  };

  /**
   * Renders the topic card main component.
   *
   * @name TopicCard Render
   */
  render() {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <TopicCardFront
          confirmCopied={this.confirmCopied}
          flipFunction={this.handleFlip}
          name={this.props.name}
          photoUrl={this.props.photoUrl}
          topicId={this.props.topicId}
        />
        <TopicCardBack
          confirmCopied={this.confirmCopied}
          flipFunction={this.handleFlip}
          name={this.props.name}
          description={this.props.description}
          topicId={this.props.topicId}
        />
      </ReactCardFlip>
    );
  }
}

TopicCard.propTypes = {
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TopicCard;
