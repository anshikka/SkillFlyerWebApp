import { USER_LOADED, USER_LOADING } from "../actions/types";
const initialState = {
  user: {},
  loading: false,
  loaded: false
};
export default function (state = initialState, action) {
  switch (action.type) {
    //returns user content loaded  
    case USER_LOADED:
      return {
        ...state,
        user: action.payload
      }
    //user content loading 
    case USER_LOADING:
      return {
        ...state,
        loading: true
      }
    //returns default state
    default:
      return state;
  }
}
