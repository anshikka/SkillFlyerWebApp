import axios from "axios";
import {
  GET_ERRORS,
  VIDEOS_LOADING,
  VIDEOS_LOADED,
  VIDEO_LOADING,
  VIDEO_LOADED,
  VIDEO_LIKING,
  VIDEO_VOTES_LOADED,
  VIDEO_VOTES_LOADING,
  VIDEO_UPVOTED,
  VIDEO_DOWNVOTED,
  VIDEO_SUBMITTED,
  VIDEO_SUBMITTING,
} from "./types";

// Topic - get all videos
export const getAllVideos = (topicName, subtopicName) => (dispatch) => {
  axios
    .get("/api/videos", {
      params: { topic_name: topicName, subtopic_name: subtopicName },
    })
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

export const getVideo = (video_id) => (dispatch) => {
  axios
    .get("/api/videos/video/" + video_id)
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

export const searchVideo = (query) => (dispatch) => {
  axios
    .get("/api/videos/search", {params: {q: query}})
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


export const getVideoVotes = (video_id) => (dispatch) => {
  axios
    .get("/api/videos/video/" + video_id)
    .then((res) => {
      dispatch(dispatchVideoVotesData(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addVideo = (video) => (dispatch) => {
  axios
    .post("/api/videos/addVideo", video)
    .then((res) => {
      dispatch(dispatchAddVideo(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const upvote = (videoId) => (dispatch) => {
  axios
    .post("/api/videos/upvote", { video_id: videoId })
    .then((res) => {
      dispatch(dispatchUpvote(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const downvote = (videoId) => (dispatch) => {
  axios
    .post("/api/videos/downvote", { video_id: videoId })
    .then((res) => {
      dispatch(dispatchDownvote(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const dispatchUpvote = (res) => {
  return {
    type: VIDEO_UPVOTED,
    payload: res,
  };
};

export const dispatchAddVideo = (res) => {
  return {
    type: VIDEO_SUBMITTED,
    payload: res,
  };
};

export const dispatchDownvote = (res) => {
  return {
    type: VIDEO_DOWNVOTED,
    payload: res,
  };
};

// get single video data
export const dispatchVideoData = (video) => {
  return {
    type: VIDEO_LOADED,
    payload: video,
  };
};

export const dispatchVideoVotesData = (video) => {
  return {
    type: VIDEO_VOTES_LOADED,
    payload: video.votes,
  };
};

export const setVideoVotesLoading = () => {
  return {
    type: VIDEO_VOTES_LOADING,
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

export const setVideoSubmitting = () => {
  return {
    type: VIDEO_SUBMITTING,
  };
};

export const setVideosLoading = () => {
  return {
    type: VIDEOS_LOADING,
  };
};

export const setVideoLiking = () => {
  return {
    type: VIDEO_LIKING,
  };
};
