import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import TopicSearchGrid from "./TopicSearchGrid";
import SubtopicSearchGrid from "./SubtopicSearchGrid";
import VideoSearchGrid from "./VideoSearchGrid";

class SearchGrid extends Component {
  /**
   * Parse the search query.
   *
   * @name SearchGrid Get Params
   */
  getSearchParams = () => {
    this.params = new URLSearchParams(this.props.location.search);
    var query = this.params.get("q");
    return query;
  };

  /**
   * Renders the search grid showing topics, subtopics, and videos matching a query.
   *
   * @name SearchGrid Render
   */
  render() {
    const query = this.getSearchParams();
    return (
      <div>
        <TopicSearchGrid query={query} />
        <SubtopicSearchGrid query={query} />
        <VideoSearchGrid query={query} />
      </div>
    );
  }
}

SearchGrid.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SearchGrid);
