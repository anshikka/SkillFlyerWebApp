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

/**
 * retrieves all videos
 *
 * @name Video getAll
 *
 *
 * @param {String, String} [topicName, subtopicName] uses topicName and subtopicName to find all the videos under given subtopic. 
 * 
 */
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

/**
 * retrieves a single video and its data
 *
 * @name Video get
 *
 *
 * @param {String} [video_id] uses video_id to find all video details to display video. 
 * 
 */
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

/**
 * Search for Video
 *
 * @name Video search
 *
 *
 * @param {String} [query] search videos for given query. 
 * 
 */

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

/**
 * retrieves the amount of votes a given Video has
 *
 * @name Video getVotes
 *
 *
 * @param {String} [video_id] uses video_id to find the number of votes in the given video. 
 * 
 */
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

/**
 * allows user to add a Video on SkillFlyer
 *
 * @name Video add
 *
 *
 * @param {Object} [video] takes video object and sends it to server (includes url, topicName, and subtopicName). 
 * 
 */
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

/**
 * Upvotes a given video
 *
 * @name Video upVote
 *
 *
 * @param {String} [videoId] takes videoId and increments the given video found by videoId. 
 * 
 */
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

/**
 * Downvotes a given video
 *
 * @name Video downVote
 *
 *
 * @param {String} [videoId] takes videoId and decrements the given video found by videoId. 
 * 
 */
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
