import { FOLDER_CONTENT_LOADED, FOLDER_CONTENT_LOADING, FOLDERS_LOADED, FOLDERS_LOADING, FOLDER_DELETED, FOLDER_DELETING, VIDEO_DELETING_FROM_FOLDER, VIDEO_DELETED_FROM_FOLDER, VIDEO_ADDED_TO_FOLDER, VIDEO_ADDING_TO_FOLDER, FOLDER_ADDED, FOLDER_ADDING } from "../actions/types";

const initialState = {
  folder: {},
  folders: [],
  loading: false,
  loaded: false,
  status: {}
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FOLDERS_LOADED:
      return {
        ...state,
        folders: action.payload,
        loaded: true,
        loading: false,
      };
    case FOLDERS_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case FOLDER_CONTENT_LOADED:
        return {
            ...state,
            folder: action.payload,
            loaded: true,
            loading: false
        }
    case FOLDER_CONTENT_LOADING, FOLDER_ADDING, VIDEO_ADDING_TO_FOLDER, VIDEO_DELETING_FROM_FOLDER, FOLDER_DELETING: 
        return {
            ...state,
            loaded: false,
            loading: true
        }
    case FOLDER_ADDED, VIDEO_ADDED_TO_FOLDER, VIDEO_DELETED_FROM_FOLDER, FOLDER_DELETED:
      return {
        ...state,
        status: action.payload,
        loaded: true
      }
    default:
      return state;
  }
}
