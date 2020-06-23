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
    case VIDEO_LOADED:
      return {
        ...state,
        video: action.payload,
        loaded: true,
        loading: false,
      };
    case VIDEO_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case VIDEO_LIKED:
      return {
        ...state,
        video: action.payload,
        loaded: true,
        loading: false,
      };
    case VIDEO_LIKING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case VIDEO_VOTES_LOADED:
      return {
        ...state,
        votes: action.payload,
        loaded: true,
      };
    case VIDEO_VOTES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case VIDEO_DOWNVOTED:
      return {
        ...state,
        votes: state.votes - 1,
      };
    case VIDEO_UPVOTED:
      return {
        ...state,
        votes: state.votes + 1,
      };
    case VIDEO_SUBMITTING:
      return {
        ...state,
        loading: true
      }
    case VIDEO_SUBMITTED:
    return {
      ...state,
      status: action.payload

    }

    default:
      return {
        ...state,
      };
  }
}
