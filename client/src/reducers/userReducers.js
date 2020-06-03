import { USER_LOADED, USER_LOADING, USER_LIKED_VIDEO_LOADED } from "../actions/types";
const initialState = {
  user: {},
  loading: false,
  loaded: false
};
export default function (state = initialState, action) {
  switch (action.type) {

    case USER_LOADED:
      return {
        ...state,
        user: action.payload
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
