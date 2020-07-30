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
    //returns all folders
    case FOLDERS_LOADED:
      return {
        ...state,
        folders: action.payload,
        loaded: true,
        loading: false,
      };
    //all folders data loading
    case FOLDERS_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    //single folder returned
    case FOLDER_LOADED:
      return {
        ...state,
        loading: false,
        loaded: true,
        folder: action.payload
      }
    //content inside single folder returned
    case FOLDER_CONTENT_LOADED:
      return {
        ...state,
        videos: action.payload,
        loaded: true,
      };
    //videos inside given folder loading
    case FOLDER_CONTENT_LOADING:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    //new folder has been created
    case FOLDER_ADDED:
      return {
        ...state,
        status: action.payload,
        loaded: true,
      };
    //folder has been deleted
    case FOLDER_DELETED:
      return {
        ...state,
        status: action.payload,
        loaded: true,
      };
    //a given video has been added to select folder
    case VIDEO_ADDED_TO_FOLDER:
      return {
        ...state,
        status: action.payload,
        loaded: true,
      };
    //given video has been deleted from select folder
    case VIDEO_DELETED_FROM_FOLDER:
      return {
        ...state,
        status: action.payload,
        loaded: true,
      };
    //returns default state
    default:
      return state;
  }
}
