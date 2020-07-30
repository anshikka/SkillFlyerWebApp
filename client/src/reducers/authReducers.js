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
    //user authenticated
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    //user information loading 
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    //returns whether user liked video 
    case USER_LIKED_VIDEO_LOADED:
      return {
        ...state,
        liked_video: action.payload.video_liked,
      };
    //loading whether video has been liked by user  
    case USER_LIKED_VIDEO_LOADING:
      return {
        ...state,
        loading: true,
      };
    //returns whether user disliked video 
    case USER_DISLIKED_VIDEO_LOADED:
      return {
        ...state,
        disliked_video: action.payload.video_disliked,
      };
    //loading whether video has been disliked by user 
    case USER_DISLIKED_VIDEO_LOADING:
      return {
        ...state,
        loading: true,
      };
    //user likes given video
    case USER_ADDED_VIDEO_TO_LIKED_VIDEOS:
      return {
        ...state,
        message: action.payload,
        liked_video: true,
        disliked_video: false
      };
    //removed from liked videos
    case USER_REMOVED_VIDEO_FROM_LIKED_VIDEOS:
      return {
        ...state,
        message: action.payload,
        liked_video: false
      };
    //liking video 
    case USER_ADDING_TO_LIKED_VIDEOS:
      return {
        ...state,
        loading: true,
      };
    //removing liked video
    case USER_REMOVING_FROM_LIKED_VIDEOS:
      return {
        ...state,
        loading: true,
      };
    //disliking video
    case USER_ADDING_TO_DISLIKED_VIDEOS:
      return {
        ...state,
        loading: true,
      };
    //removing from disliked video
    case USER_REMOVING_FROM_DISLIKED_VIDEOS:
      return {
        ...state,
        loading: true,
      };
    //dislikes video
    case USER_ADDED_VIDEO_TO_DISLIKED_VIDEOS:
      return {
        ...state,
        disliked_video: true,
        liked_video: false
      }
    //removed from disliked videos
    case USER_REMOVED_VIDEO_FROM_DISLIKED_VIDEOS:
      return {
        ...state,
        disliked_video: false
      }
    //returns default state
    default:
      return state;
  }
}
