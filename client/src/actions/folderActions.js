import axios from "axios";
import {
  GET_ERRORS,
  FOLDERS_LOADING,
  FOLDERS_LOADED,
  FOLDER_CONTENT_LOADING,
  FOLDER_CONTENT_LOADED,
  VIDEO_ADDING_TO_FOLDER,
  VIDEO_ADDED_TO_FOLDER,
  FOLDER_ADDED,
  FOLDER_LOADED,
  FOLDER_ADDING,
  VIDEO_DELETED_FROM_FOLDER,
  VIDEO_DELETING_FROM_FOLDER,
  FOLDER_DELETED,
  FOLDER_DELETING
} from "./types";

// Topic - get all topics
export const getAllFolders = (userId) => (dispatch) => {
  axios
    .get("/api/folders/", {params: {user_id: userId}})
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

export const getFolder = (folderId) => (dispatch) => {
  axios.get("/api/folders/" + folderId)
  .then((res) => {
    dispatch(dispatchFolder(res.data));
  })
  .catch((err) => 
  dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

export const getFolderVideos = (folderId) => (dispatch) => {
  axios
    .get("/api/folders/" + folderId + "/videos")
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

export const addFolder = (folderDetails) => (dispatch) => {
  axios
    .post("/api/folders/addFolder", folderDetails)
    .then((res) => {
      dispatch(dispatchAddFolder(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addVideoToFolder = (video) => (dispatch) => {
    axios.post("/api/folders/addVideo", video).then((res)=> {
        dispatch(dispatchAddVideoToFolder(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}

export const deleteVideoFromFolder = (video) => (dispatch) => {
    axios.put("/api/folders/deleteVideo", video).then((res)=> {
        dispatch(dispatchDeleteVideoFromFolder(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}

export const deleteFolder = (folderDetails) => (dispatch) => {
    axios
      .put("/api/folders/deleteFolder", folderDetails)
      .then((res) => {
        dispatch(dispatchDeleteFolder(res.data));
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
    payload: folder_data,
  };
};

export const dispatchFolder = (folder) => {
  return {
    type: FOLDER_LOADED,
    payload: folder
  }
}

export const setFolderContentLoading = () => {
  return {
    type: FOLDER_CONTENT_LOADING,
  };
};

export const dispatchAddFolder = (res) => {
  return {
    type: FOLDER_ADDED,
    payload: res,
  };
};

export const setFolderAdding = () => {
    return {
        type: FOLDER_ADDING
    }
}

export const dispatchAddVideoToFolder = (res) => {
    return {
        type: VIDEO_ADDED_TO_FOLDER,
        payload: res
    };
}

export const setVideoAddingToFolder = () => {
    return {
        type: VIDEO_ADDING_TO_FOLDER
    }
}

export const dispatchDeleteVideoFromFolder = (res) => {
    return {
        type: VIDEO_DELETED_FROM_FOLDER,
        payload: res
    };
}

export const setVideoDeletingFromFolder = () => {
    return {
        type: VIDEO_DELETING_FROM_FOLDER
    }
}

export const dispatchDeleteFolder = (res) => {
    return {
      type: FOLDER_DELETED,
      payload: res,
    };
  };
  
  export const setFolderDeleting = () => {
      return {
          type: FOLDER_DELETING
      }
  }