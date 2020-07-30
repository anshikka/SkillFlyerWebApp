import {
  VIDEO_LOADING,
  VIDEO_LOADED,
  VIDEO_LIKED,
  VIDEO_LIKING,
  VIDEO_VOTES_LOADED,
  VIDEO_VOTES_LOADING,
  VIDEO_DOWNVOTED,
  VIDEO_UPVOTED,
  VIDEO_SUBMITTING,
  VIDEO_SUBMITTED,
} from "../actions/types";

const initialState = {
  video: {},
  loading: false,
  loaded: false,
  votes: 0,
  status: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    //returns video object
    case VIDEO_LOADED:
      return {
        ...state,
        video: action.payload,
        loaded: true,
        loading: false,
      };
    //video is loading
    case VIDEO_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    //user has liked video
    case VIDEO_LIKED:
      return {
        ...state,
        video: action.payload,
        loaded: true,
        loading: false,
      };
    //video like is being processed
    case VIDEO_LIKING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    //number of votes on video is returned
    case VIDEO_VOTES_LOADED:
      return {
        ...state,
        votes: action.payload,
        loaded: true,
      };
    //number of votes in video is loading
    case VIDEO_VOTES_LOADING:
      return {
        ...state,
        loading: true,
      };
    //video has been downvoted
    case VIDEO_DOWNVOTED:
      return {
        ...state,
        votes: state.votes - 1,
      };
    //video has been upvoted
    case VIDEO_UPVOTED:
      return {
        ...state,
        votes: state.votes + 1,
      };
    //video is in process of being submitted 
    case VIDEO_SUBMITTING:
      return {
        ...state,
        loading: true
      }
    //video has successfully been added to SkillFlyer
    case VIDEO_SUBMITTED:
      return {
        ...state,
        status: action.payload
      }
    //returns default state
    default:
      return {
        ...state,
      };
  }
}
