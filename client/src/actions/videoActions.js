import axios from "axios";
import {
  GET_ERRORS,
  VIDEOS_LOADING,
  VIDEOS_LOADED,
  VIDEO_LOADING,
  VIDEO_LOADED,
  VIDEO_LIKED,
  VIDEO_LIKING,
} from "./types";

// Topic - get all videos
export const getAllVideos = (topicName, subtopicName) => (dispatch) => {
  axios
    .get("/api/" + topicName + "/" + subtopicName + "/videos")
    .then((res) => {
      dispatch(dispatchVideosData(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getVideo = (topicName, subtopicName, video_id) => (dispatch) => {
  axios
    .get("/api/" + topicName + "/" + subtopicName + "/videos/" + video_id)
    .then((res) => {
      dispatch(dispatchVideoData(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const likeVideo = (topicName, subtopicName, userId, videoId) => (
  dispatch
) => {
  const user = { user_id: userId };
  axios
    .put("/api/" + topicName + "/" + subtopicName + "/videos/" + videoId + "/upvote", user)
    .then((res) => {
      console.log(res);
      dispatch(dispatchLikeVideo(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// get single video data
export const dispatchVideoData = (video) => {
  return {
    type: VIDEO_LOADED,
    payload: video,
  };
};

export const setVideoLoading = () => {
  return {
    type: VIDEO_LOADING,
  };
};

// Get all videos data
export const dispatchVideosData = (videos) => {
  return {
    type: VIDEOS_LOADED,
    payload: videos,
  };
};

export const setVideosLoading = () => {
  return {
    type: VIDEOS_LOADING,
  };
};

export const dispatchLikeVideo = (res) => {
  console.log("Dispatched")
  return {
    type: VIDEO_LIKED,
    payload: res,
  };
};

export const setVideoLiking = () => {
  return {
    type: VIDEO_LIKING,
  };
};
