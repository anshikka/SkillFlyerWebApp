import axios from "axios";
import { GET_ERRORS, SUBTOPICS_LOADING, SUBTOPICS_LOADED } from "./types";

// Topic - get all topics
export const getAllSubtopics = (topic) => (dispatch) => {
  axios
    .post("/api/subtopics", topic)
    .then((res) => {
      dispatch(dispatchSubtopicData(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Get all subtopic data
export const dispatchSubtopicData = (subtopics) => {
  return {
    type: SUBTOPICS_LOADED,
    payload: subtopics,
  };
};

export const setSubtopicsLoading = () => {
  return {
    type: SUBTOPICS_LOADING,
  };
};
