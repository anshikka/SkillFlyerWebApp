import { VIDEOS_LOADING, VIDEOS_LOADED, VIDEO_SUBMITTED, VIDEO_SUBMITTING } from "../actions/types";

const initialState = {
  videos: [],
  loading: false,
  loaded: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case VIDEOS_LOADED:
      return {
        ...state,
        videos: action.payload,
        loaded: true,
        loading: false,
      };
    case VIDEOS_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case VIDEO_SUBMITTING: {
      return {
        ...state,
        loading: true,
        loaded: false
      }
    }
    case VIDEO_SUBMITTED: 
      return {
        ...state,
        loaded: true,
        loading: false,
      }

    default:
      return state;
  }
}
