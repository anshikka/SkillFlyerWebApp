import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import TopicSearchGrid from "./TopicSearchGrid";
import SubtopicSearchGrid from "./SubtopicSearchGrid";
import VideoSearchGrid from "./VideoSearchGrid";
import { Typography } from "@material-ui/core";

class SearchGrid extends Component {
  getParams = () => {
    this.params = new URLSearchParams(this.props.location.search)
    var query = this.params.get('q');
    return query;
  }
  componentDidMount() {
  }
  render() {
    const query = this.getParams();
    return (
      <div>
        <TopicSearchGrid query={query}/>
        <SubtopicSearchGrid query={query}/>
        <VideoSearchGrid query={query}/>
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
