import { combineReducers } from "redux";
import authReducer from "./authReducers";
import userReducer from "./userReducers"
import errorReducer from "./errorReducers";
import topicReducer from "./topicReducers";
import subtopicReducer from "./subtopicReducers";
import videoReducer from "./videoReducers";
import videosReducer from "./videosReducers";
import folderReducer from "./folderReducers";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  topics: topicReducer,
  subtopics: subtopicReducer,
  videos: videosReducer,
  video: videoReducer,
  user: userReducer,
  folders: folderReducer,
});
