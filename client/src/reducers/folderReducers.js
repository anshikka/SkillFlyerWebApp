import { FOLDER_CONTENT_LOADED, FOLDER_CONTENT_LOADING, FOLDERS_LOADED, FOLDERS_LOADING } from "../actions/types";

const initialState = {
  folder: {},
  folders: [],
  loading: false,
  loaded: false,
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
    case FOLDER_CONTENT_LOADING: 
        return {
            ...state,
            loaded: false,
            loading: true
        }
    default:
      return state;
  }
}
