import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import topicReducer from "./topicReducers"
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  topics: topicReducer
});