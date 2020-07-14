import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  USER_LIKED_VIDEO_LOADED,
  USER_LIKED_VIDEO_LOADING,
  USER_DISLIKED_VIDEO_LOADED,
  USER_DISLIKED_VIDEO_LOADING,
  USER_ADDED_VIDEO_TO_LIKED_VIDEOS,
  USER_REMOVED_VIDEO_FROM_LIKED_VIDEOS,
  USER_ADDED_VIDEO_TO_DISLIKED_VIDEOS,
  USER_ADDING_TO_LIKED_VIDEOS,
  USER_ADDING_TO_DISLIKED_VIDEOS,
  USER_REMOVING_FROM_DISLIKED_VIDEOS,
  USER_REMOVING_FROM_LIKED_VIDEOS,
  USER_REMOVED_VIDEO_FROM_DISLIKED_VIDEOS,
} from "./types";
// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login")) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const getUserLikedVideo = (userId, videoId) => (dispatch) => {
  axios
    .get("/api/users/inLikedVideos", {
      params: { user_id: userId, video_id: videoId },
    })
    .then((res) => {
      dispatch(dispatchUserLikedVideo(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const dispatchUserLikedVideo = (res) => {
  return {
    type: USER_LIKED_VIDEO_LOADED,
    payload: res,
  };
};

export const getUserDislikedVideo = (userId, videoId) => (dispatch) => {
  axios
    .get("/api/users/inDislikedVideos", {
      params: { user_id: userId, video_id: videoId },
    })
    .then((res) => {
      dispatch(dispatchUserDislikedVideo(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const dispatchUserDislikedVideo = (res) => {
  return {
    type: USER_DISLIKED_VIDEO_LOADED,
    payload: res,
  };
};

export const addToLikedVideos = (userId, videoId) => (dispatch) => {
  axios
    .post("/api/users/addToLikedVideos", { user_id: userId, video_id: videoId })
    .then((res) => {
      dispatch(dispatchAddToLikedVideos(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const dispatchAddToLikedVideos = (res) => {
  return {
    type: USER_ADDED_VIDEO_TO_LIKED_VIDEOS,
    payload: res,
  };
};

export const removeFromLikedVideos = (userId, videoId) => (dispatch) => {
  axios
    .put("/api/users/removeFromLikedVideos", {
      user_id: userId,
      video_id: videoId,
    })
    .then((res) => {
      dispatch(dispatchRemoveFromLikedVideos(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const dispatchRemoveFromLikedVideos = (res) => {
  return {
    type: USER_REMOVED_VIDEO_FROM_LIKED_VIDEOS,
    payload: res,
  };
};
export const addToDislikedVideos = (userId, videoId) => (dispatch) => {
  axios
    .post("/api/users/addToDislikedVideos", {
      user_id: userId,
      video_id: videoId,
    })
    .then((res) => {
      dispatch(dispatchAddToDislikedVideos(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const dispatchAddToDislikedVideos = (res) => {
  return {
    type: USER_ADDED_VIDEO_TO_DISLIKED_VIDEOS,
    payload: res,
  };
};

export const removeFromDislikedVideos = (userId, videoId) => (dispatch) => {
  axios
    .put("/api/users/removeFromDislikedVideos", {
      user_id: userId,
      video_id: videoId,
    })
    .then((res) => {
      dispatch(dispatchRemoveFromDislikedVideos(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const dispatchRemoveFromDislikedVideos = (res) => {
  return {
    type: USER_REMOVED_VIDEO_FROM_DISLIKED_VIDEOS,
    payload: res,
  };
};

export const userAddedToLikedVideosLoading = () => {
  return {
    type: USER_ADDING_TO_LIKED_VIDEOS,
  };
};

export const userRemovedFromLikedVideosLoading = () => {
  return {
    type: USER_REMOVING_FROM_LIKED_VIDEOS,
  };
};

export const userAddedToDislikedVideosLoading = () => {
  return {
    type: USER_ADDING_TO_DISLIKED_VIDEOS,
  };
};

export const userRemovedFromDislikedVideosLoading = () => {
  return {
    type: USER_REMOVING_FROM_DISLIKED_VIDEOS,
  };
};

export const userLikedVideoLoading = () => {
  return {
    type: USER_LIKED_VIDEO_LOADING,
  };
};

export const userDislikedVideoLoading = () => {
  return {
    type: USER_DISLIKED_VIDEO_LOADING,
  };
};
