import axios from "axios";
import { GET_ERRORS, FOLDERS_LOADING, FOLDERS_LOADED, FOLDER_CONTENT_LOADING, FOLDER_CONTENT_LOADED } from "./types";

// Topic - get all topics
export const getAllFolders = (user) => (dispatch) => {
  axios
    .post("/api/users/folders/", user)
    .then((res) => {
      dispatch(dispatchFolderData(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getFolderContent = (folder_name, user) => (dispatch) => {
  axios
    .post("/api/users/folders/" + folder_name, user)
    .then((res) => {
      dispatch(dispatchFolderContent(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Get all folders 
export const dispatchFolderData = (folders) => {
  return {
    type: FOLDERS_LOADED,
    payload: folders,
  };
};

export const setFoldersLoading = () => {
  return {
    type: FOLDERS_LOADING,
  };
};

export const dispatchFolderContent = (folder_data) => {
    return {
        type: FOLDER_CONTENT_LOADED,
        payload: folder_data
    };
}

export const setFolderContentLoading = () => {
    return {
        type: FOLDER_CONTENT_LOADING
    };
}
