import axios from "axios";
import { GET_ERRORS, TOPIC_LOADING, TOPIC_LOADED } from "./types";

/**
 * retrieves all the topics
 *
 * @name Topics getAll
 *
 */
export const getAllTopics = () => (dispatch) => {
  axios
    .get("/api/topics")
    .then((res) => {
      dispatch(dispatchTopicData(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

/**
 * Search for Topic
 *
 * @name Topic search
 *
 *
 * @param {String} [query] search topics for given query. 
 * 
 */
export const searchTopic = (query) => (dispatch) => {
  axios
    .get("/api/topics/search", {params: {q: query}})
    .then((res) => {
      dispatch(dispatchTopicData(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get all topic data
export const dispatchTopicData = (topics) => {
  return {
    type: TOPIC_LOADED,
    payload: topics,
  };
};

export const setTopicsLoading = () => {
  return {
    type: TOPIC_LOADING,
  };
};
