import { TOPIC_LOADING, TOPIC_LOADED } from "../actions/types";

const initialState = {
  topics: [],
  loading: false,
  loaded: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    //returns all topics
    case TOPIC_LOADED:
      return {
        ...state,
        topics: action.payload,
        loaded: true,
        loading: false,
      };
    //loading all topics
    case TOPIC_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    //returns default state
    default:
      return state;
  }
}
