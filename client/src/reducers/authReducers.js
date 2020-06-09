import {
  SET_CURRENT_USER,
  USER_LOADING,
  USER_LIKED_VIDEO_LOADED,
  USER_LIKED_VIDEO_LOADING,
  USER_DISLIKED_VIDEO_LOADING,
  USER_DISLIKED_VIDEO_LOADED,
  USER_ADDED_VIDEO_TO_LIKED_VIDEOS,
  USER_ADDED_VIDEO_TO_DISLIKED_VIDEOS,
  USER_ADDING_TO_DISLIKED_VIDEOS,
  USER_REMOVED_VIDEO_FROM_LIKED_VIDEOS,
  USER_REMOVED_VIDEO_FROM_DISLIKED_VIDEOS,
  USER_ADDING_TO_LIKED_VIDEOS,
  USER_REMOVING_FROM_LIKED_VIDEOS,
  USER_REMOVING_FROM_DISLIKED_VIDEOS,
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  liked_video: false,
  disliked_video: false,
  message: {},
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
        liked_video: action.payload.video_liked,
      };
    case USER_LIKED_VIDEO_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_DISLIKED_VIDEO_LOADED:
      return {
        ...state,
        disliked_video: action.payload.video_disliked,
      };
    case USER_DISLIKED_VIDEO_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_ADDED_VIDEO_TO_LIKED_VIDEOS:
      return {
        ...state,
        message: action.payload,
        liked_video: true,
        disliked_video: false
      };
    case USER_REMOVED_VIDEO_FROM_LIKED_VIDEOS:
      return {
        ...state,
        message: action.payload,
        liked_video: false
      };
    case USER_ADDING_TO_LIKED_VIDEOS:
      return {
        ...state,
        loading: true,
      };
    case USER_REMOVING_FROM_LIKED_VIDEOS:
      return {
        ...state,
        loading: true,
      };
    case USER_ADDING_TO_DISLIKED_VIDEOS:
      return {
        ...state,
        loading: true,
      };
    case USER_REMOVING_FROM_DISLIKED_VIDEOS:
      return {
        ...state,
        loading: true,
      };
    case USER_ADDED_VIDEO_TO_DISLIKED_VIDEOS: 
      return {
        ...state,
        disliked_video: true,
        liked_video: false
      }
    case USER_REMOVED_VIDEO_FROM_DISLIKED_VIDEOS:
      return {
        ...state,
        disliked_video: false
      }
    default:
      return state;
  }
}
