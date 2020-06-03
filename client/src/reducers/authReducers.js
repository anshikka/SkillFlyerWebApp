import { SET_CURRENT_USER, USER_LOADING, USER_LIKED_VIDEO_LOADED, USER_LIKED_VIDEO_LOADING } from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  liked_video: {video_liked: "false"}
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
    default:
      return state;
  }
}
