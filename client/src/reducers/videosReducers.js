import { VIDEOS_LOADING, VIDEOS_LOADED, VIDEO_SUBMITTED, VIDEO_SUBMITTING } from "../actions/types";

const initialState = {
  videos: [],
  loading: false,
  loaded: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    //loads all videos 
    case VIDEOS_LOADED:
      return {
        ...state,
        videos: action.payload,
        loaded: true,
        loading: false,
      };
    //all videos are loading
    case VIDEOS_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    //videos is being added to platform
    case VIDEO_SUBMITTING: {
      return {
        ...state,
        loading: true,
        loaded: false
      }
    }
    //video has successfully been added
    case VIDEO_SUBMITTED:
      return {
        ...state,
        loaded: true,
        loading: false,
      }
    //returns default state
    default:
      return state;
  }
}
