import { VIDEO_LOADING, VIDEO_LOADED } from "../actions/types";

const initialState = {
  video: {},
  loading: false,
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VIDEO_LOADED:
      return {
        ...state,
        video: action.payload,
        loaded: true,
        loading: false,
      };
    case VIDEO_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    default:
      return {
        ...state,
      };
  }
}
