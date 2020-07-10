import {
  FOLDER_CONTENT_LOADED,
  FOLDER_CONTENT_LOADING,
  FOLDERS_LOADED,
  FOLDERS_LOADING,
  FOLDER_DELETED,
  VIDEO_DELETED_FROM_FOLDER,
  VIDEO_ADDED_TO_FOLDER,
  FOLDER_ADDED,
  FOLDER_LOADED,
} from "../actions/types";

const initialState = {
  folders: [],
  videos: [],
  loading: false,
  loaded: false,
  status: {},
  folder: {}
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
    case FOLDER_LOADED: 
    return {
      ...state,
      loading: false,
      loaded: true,
      folder: action.payload
    }
    case FOLDER_CONTENT_LOADED:
      return {
        ...state,
        videos: action.payload,
        loaded: true,
      };
    case FOLDER_CONTENT_LOADING:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case FOLDER_ADDED:
      return {
        ...state,
        status: action.payload,
        loaded: true,
      };
    case FOLDER_DELETED:
      return {
        ...state,
        status: action.payload,
        loaded: true,
      };
    case VIDEO_ADDED_TO_FOLDER:
      return {
        ...state,
        status: action.payload,
        loaded: true,
      };
    case VIDEO_DELETED_FROM_FOLDER:
      return {
        ...state,
        status: action.payload,
        loaded: true,
      };
    default:
      return state;
  }
}
