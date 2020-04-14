import {
    SUBTOPICS_LOADING,
    SUBTOPICS_LOADED
  } from "../actions/types";

  const initialState = {
    subtopics: [],
    loading: false,
    loaded: false
  };
  export default function(state = initialState, action) {

    switch (action.type) {
      case SUBTOPICS_LOADED:

        return {
          ...state,
          subtopics: action.payload,
          loaded: true,
          loading: false
        };
      case SUBTOPICS_LOADING:
        return {
          ...state,
          loading: true,
          loaded: false
        };
      default:
        return state;
    }
  }