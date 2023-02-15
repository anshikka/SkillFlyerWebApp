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

/**
 * gets all of the User's folders
 *
 * @name Folder getAll
 *
 *
 * @param {String} [userId] finds User by userId and will return all the folders in the User Object. 
 * 
 */
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

/**
 * gets all of content of the folder such as name and number of videos
 *
 * @name Folder getDetails
 *
 *
 * @param {String} [folderId] finds folder by folderId and all the details of the folder. 
 * 
 */
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

/**
 * gets all of the videos inside a selected folder
 *
 * @name Folder getContent
 *
 *
 * @param {String} [folderId] finds folder by folderId and retrieves all the videoId's in the folder.  
 * 
 */
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

/**
 * Create a New Folder
 *
 * @name Folder add
 *
 *
 * @param {String} [folderDetails] retrieves folderDetails and creates a new Folder.  
 * 
 */
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

/**
 * gives User ability to add Video to a given Folder
 *
 * @name Folder addVideo
 *
 *
 * @param {String, String} [videoId, folderId] finds folder by folderId and adds the videoId into folder by folderId. 
 * 
 */
export const addVideoToFolder = (videoId, folderId) => (dispatch) => {
    axios.post("/api/folders/addVideo", {video_id: videoId, folder_id: folderId}).then((res)=> {
        dispatch(dispatchAddVideoToFolder(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}


/**
 * gives User ability to delete Video from a given Folder
 *
 * @name Folder deleteVideo
 *
 *
 * @param {String, String} [videoId, folderId] finds folder by folderId and deletes the videoId from the folder. 
 * 
 */
export const deleteVideoFromFolder = (videoId, folderId) => (dispatch) => {
    axios.put("/api/folders/deleteVideo", {video_id: videoId, folder_id: folderId}).then((res)=> {
        dispatch(dispatchDeleteVideoFromFolder(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}

/**
 * allows user to Delete Folder
 *
 * @name Folder delete
 *
 *
 * @param {String} [folderDetails] finds folder by folderDetails and then remove selected Folder. 
 * 
 */

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