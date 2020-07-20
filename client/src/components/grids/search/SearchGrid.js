import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import TopicSearchGrid from "./TopicSearchGrid";
import SubtopicSearchGrid from "./SubtopicSearchGrid";
import VideoSearchGrid from "./VideoSearchGrid";

class SearchGrid extends Component {
  componentDidMount() {

  }
  render() {
    return (
     <div>
         <TopicSearchGrid/>
         <hr/>
         <SubtopicSearchGrid/>
         <hr/>
         <VideoSearchGrid/>
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
