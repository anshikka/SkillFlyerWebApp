import { FOLDER_CONTENT_LOADED, FOLDER_CONTENT_LOADING, FOLDERS_LOADED, FOLDERS_LOADING, FOLDER_DELETED, VIDEO_DELETED_FROM_FOLDER, VIDEO_ADDED_TO_FOLDER, FOLDER_ADDED } from "../actions/types";

const initialState = {
  folder: {},
  folders: [],
  loading: false,
  loaded: false,
  folder_content_loaded: false,
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
            folder_content_loaded: true,
            loading: false
        }
    case FOLDER_CONTENT_LOADING:
        return {
            ...state,
            loaded: false,
            loading: true
        }
    case FOLDER_ADDED:
      return {
        ...state,
        status: action.payload,
        loaded: true
      }
    case FOLDER_DELETED:
      return {
        ...state,
        status: action.payload,
        loaded: true
      }
    case VIDEO_ADDED_TO_FOLDER:
      return {
        ...state,
        status: action.payload,
        loaded: true
      }
    case VIDEO_DELETED_FROM_FOLDER:
      return {
        ...state,
        status: action.payload,
        loaded: true
      }
    default:
      return state;
  }
}
