import { SET_CURRENT_USER, USER_LOADING, USER_LIKED_VIDEO_LOADED, USER_LIKED_VIDEO_LOADING, USER_DISLIKED_VIDEO_LOADING, USER_DISLIKED_VIDEO_LOADED } from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  liked_video: {video_liked: "false"},
  disliked_video: {video_disliked: "false"}
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LIKED_VIDEO_LOADED:
      return {
        ...state,
        liked_video: action.payload
      }
    case USER_LIKED_VIDEO_LOADING:
    return {
      ...state,
      loading: true
    }
    case USER_DISLIKED_VIDEO_LOADED:
      return {
        ...state,
        disliked_video: action.payload
      }
    case USER_DISLIKED_VIDEO_LOADING:
    return {
      ...state,
      loading: true
    }
    default:
      return state;
  }
}
